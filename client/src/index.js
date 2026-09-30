import { getWeb3, getContract, getCurrentAccount } from "./utils.js";

let web3;
let contract;
let contractAddress;
let currentAccount;

// ── Initialize on page load ──────────────────────────────────────────────────
window.addEventListener("load", async () => {
  const accountEl = document.getElementById("current-account");
  const contractEl = document.getElementById("contract-address");

  try {
    web3 = await getWeb3();
    const contractData = await getContract(web3);
    contract = contractData.contract;
    contractAddress = contractData.address;
    currentAccount = await getCurrentAccount(web3);

    accountEl.textContent = currentAccount;
    contractEl.textContent = contractAddress;
    console.log("✅ Connected to Ganache and CertVerify contract at:", contractAddress);
  } catch (err) {
    accountEl.textContent = "Connection Error";
    accountEl.style.color = "#e74c3c";
    contractEl.textContent = "Not Deployed";
    console.warn("Blockchain connection notice:", err.message);
  }
});

// ── Helper: Display status in results box ─────────────────────────────────────
function showResult(elementId, message, type = "success") {
  const el = document.getElementById(elementId);
  el.classList.remove("hidden", "success", "error", "warning", "info");
  el.classList.add(type);
  el.innerHTML = message;
}

// ── Helper: Convert date string to Unix timestamp ─────────────────────────────
function dateToTimestamp(dateStr) {
  return Math.floor(new Date(dateStr).getTime() / 1000);
}

// ── 1. ISSUE CERTIFICATE (Write operation: costs gas, .send()) ────────────────
document.getElementById("issue-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!contract) {
    alert("Contract not connected. Please ensure Ganache is running and 'truffle migrate' has been executed.");
    return;
  }

  const recipientName = document.getElementById("recipient-name").value.trim();
  const courseName    = document.getElementById("course-name").value.trim();
  const grade         = document.getElementById("grade").value.trim();
  const expiryDate    = document.getElementById("expiry-date").value;

  if (!expiryDate) {
    alert("Please select a valid expiry date.");
    return;
  }

  const expiryTs = dateToTimestamp(expiryDate);
  const nowTs = Math.floor(Date.now() / 1000);

  if (expiryTs <= nowTs) {
    alert("Expiry date must be in the future!");
    return;
  }

  showResult("issue-result", "⏳ Submitting transaction to Ganache...", "info");

  try {
    const receipt = await contract.methods
      .issueCertificate(recipientName, courseName, grade, expiryTs)
      .send({ from: currentAccount, gas: 300000 });

    let certHash = "";
    if (receipt.events && receipt.events.CertificateIssued) {
      certHash = receipt.events.CertificateIssued.returnValues.certHash;
    }

    showResult("issue-result",
      `✅ <strong>Certificate Successfully Issued!</strong><br/><br/>
       <strong>Recipient:</strong> ${recipientName}<br/>
       <strong>Course:</strong> ${courseName}<br/>
       <strong>Grade:</strong> ${grade}<br/>
       <strong>Tx Hash:</strong> <code>${receipt.transactionHash}</code><br/>
       <strong>Certificate Hash (ID):</strong><br/>
       <code style="word-break: break-all; color: #2980b9; font-weight: bold;">${certHash}</code><br/><br/>
       <em>📋 Copy this Certificate Hash to verify or revoke this credential.</em>`,
      "success"
    );

    // Auto-fill into verify form for convenience
    document.getElementById("cert-hash").value = certHash;
    document.getElementById("issue-form").reset();
  } catch (err) {
    console.error("Issue Error:", err);
    showResult("issue-result", `❌ <strong>Issuance Failed:</strong> ${err.message}`, "error");
  }
});

// ── 2. VERIFY CERTIFICATE (Read operation: 0 Gas, .call()) ────────────────────
document.getElementById("verify-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!contract) {
    alert("Contract not connected. Please ensure Ganache is running on port 7545.");
    return;
  }

  const certHash = document.getElementById("cert-hash").value.trim();

  if (!certHash || !certHash.startsWith("0x") || certHash.length !== 66) {
    showResult("verify-result", "❌ Please enter a valid 32-byte hex hash starting with <code>0x</code>.", "error");
    return;
  }

  showResult("verify-result", "🔍 Querying Ethereum ledger...", "info");

  try {
    const result = await contract.methods.verifyCertificate(certHash).call();
    const { valid, status, cert } = result;

    if (valid) {
      const issued = new Date(Number(cert.issuedDate) * 1000).toLocaleString();
      const expiry = new Date(Number(cert.expiryDate) * 1000).toLocaleString();

      showResult("verify-result",
        `✅ <span style="font-size: 1.1rem; font-weight: bold; color: #27ae60;">AUTHENTIC & VALID CERTIFICATE</span><br/><br/>
         👤 <strong>Recipient Name:</strong> ${cert.recipientName}<br/>
         📚 <strong>Course:</strong> ${cert.courseName}<br/>
         🏅 <strong>Grade:</strong> ${cert.grade}<br/>
         📅 <strong>Issued Date:</strong> ${issued}<br/>
         ⏳ <strong>Expiry Date:</strong> ${expiry}<br/>
         🏛️ <strong>Issuer Address:</strong> <code>${cert.issuerAddress}</code><br/>
         🔑 <strong>Hash ID:</strong> <code style="word-break: break-all;">${cert.certificateHash}</code>`,
        "success"
      );
    } else if (status === "REVOKED") {
      showResult("verify-result",
        `❌ <span style="font-weight: bold; color: #c0392b;">CERTIFICATE HAS BEEN REVOKED</span><br/>
         This certificate was officially cancelled by the issuing authority and is no longer valid.`,
        "error"
      );
    } else if (status === "EXPIRED") {
      const expiry = new Date(Number(cert.expiryDate) * 1000).toLocaleDateString();
      showResult("verify-result",
        `⚠️ <span style="font-weight: bold; color: #b7770d;">CERTIFICATE HAS EXPIRED</span><br/>
         This certificate was authentic but expired on ${expiry}.`,
        "warning"
      );
    } else {
      showResult("verify-result",
        `❌ <span style="font-weight: bold; color: #c0392b;">CERTIFICATE NOT FOUND</span><br/>
         No record matching this hash exists on the blockchain. Possible fraudulent document.`,
        "error"
      );
    }
  } catch (err) {
    console.error("Verify Error:", err);
    showResult("verify-result", `❌ Query failed: ${err.message}`, "error");
  }
});

// ── 3. REVOKE CERTIFICATE (Write operation: costs gas, .send()) ───────────────
document.getElementById("revoke-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!contract) {
    alert("Contract not connected. Please ensure Ganache is running on port 7545.");
    return;
  }

  const revokeHash = document.getElementById("revoke-hash").value.trim();

  if (!revokeHash || !revokeHash.startsWith("0x") || revokeHash.length !== 66) {
    showResult("revoke-result", "❌ Please enter a valid 32-byte hex hash starting with <code>0x</code>.", "error");
    return;
  }

  showResult("revoke-result", "⏳ Submitting revocation transaction to Ganache...", "info");

  try {
    const receipt = await contract.methods
      .revokeCertificate(revokeHash)
      .send({ from: currentAccount, gas: 200000 });

    showResult("revoke-result",
      `✅ <strong>Certificate Revoked Successfully!</strong><br/><br/>
       <strong>Tx Hash:</strong> <code>${receipt.transactionHash}</code><br/>
       <strong>Revoked Hash:</strong> <code>${revokeHash}</code><br/>
       <em>Status updated permanently on the blockchain.</em>`,
      "success"
    );

    document.getElementById("revoke-form").reset();
  } catch (err) {
    console.error("Revoke Error:", err);
    showResult("revoke-result", `❌ <strong>Revocation Failed:</strong> ${err.message}`, "error");
  }
});
