---
name: testing-debugging
description: Comprehensive testing, debugging, and verification procedures for CertVerify, including Truffle contract unit tests, manual edge-case verification, and RPC troubleshooting.
---

# Testing & Debugging Skill

## Goal
Validate all core functions and failure branches of the CertVerify DApp before deployment and submission.

## Test Matrix

| # | Test Scenario | Input Data | Expected Result |
|---|---------------|------------|-----------------|
| 1 | **Valid Issuance** | Name: "John Doe", Course: "BCT", Grade: "A", Expiry: +1 yr | Tx mines; `CertificateIssued` event emitted; hash returned |
| 2 | **Valid Verification** | Correct `certHash` from Test 1 | `valid == true`, `status == "VALID"`, full details returned |
| 3 | **Unauthorized Issuance** | Call `issueCertificate()` from non-issuer account | Reverts with `"Only authorized issuers can call this"` |
| 4 | **Revocation** | Call `revokeCertificate(certHash)` from issuer | Tx mines; `isActive` set to `false`; `CertificateRevoked` emitted |
| 5 | **Verify Revoked Cert** | Query revoked `certHash` | `valid == false`, `status == "REVOKED"` |
| 6 | **Verify Expired Cert** | Query cert with past `expiryDate` | `valid == false`, `status == "EXPIRED"` |
| 7 | **Non-existent Cert** | Random `bytes32` hash | `valid == false`, `status == "NOT_FOUND"` |
| 8 | **Empty Inputs** | Blank recipient name or course | Reverts with `"Recipient name required"` |

## Truffle Unit Test (`test/CertVerify.test.js`)
```javascript
const CertVerify = artifacts.require("CertVerify");

contract("CertVerify", (accounts) => {
  const [owner, nonIssuer] = accounts;
  let certVerify;
  let certHash;

  before(async () => {
    certVerify = await CertVerify.deployed();
  });

  it("should issue a certificate successfully", async () => {
    const futureExpiry = Math.floor(Date.now() / 1000) + 86400 * 365;
    const tx = await certVerify.issueCertificate("Alice", "Blockchain", "A", futureExpiry, { from: owner });
    assert.equal(tx.logs[0].event, "CertificateIssued", "CertificateIssued event should be emitted");
    certHash = tx.logs[0].args.certHash;
  });

  it("should verify a valid certificate", async () => {
    const result = await certVerify.verifyCertificate(certHash);
    assert.equal(result.valid, true, "Certificate should be valid");
    assert.equal(result.status, "VALID", "Status should be VALID");
    assert.equal(result.cert.recipientName, "Alice");
  });

  it("should reject issuance from non-issuer", async () => {
    const futureExpiry = Math.floor(Date.now() / 1000) + 86400 * 365;
    try {
      await certVerify.issueCertificate("Bob", "AI", "B", futureExpiry, { from: nonIssuer });
      assert.fail("Should have thrown error");
    } catch (err) {
      assert.include(err.message, "Only authorized issuers can call this");
    }
  });

  it("should revoke a certificate", async () => {
    await certVerify.revokeCertificate(certHash, { from: owner });
    const result = await certVerify.verifyCertificate(certHash);
    assert.equal(result.valid, false);
    assert.equal(result.status, "REVOKED");
  });
});
```

## Running Unit Tests
```bash
truffle test
```
