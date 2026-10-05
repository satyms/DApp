# EXPERIMENT NO. 8

## Aim
**Creating a Decentralized Blockchain Application (DApp) with Web3.js, Solidity, Truffle, and Ganache.**

---

## Develop your first DApp with Web3.js

A world of cryptocurrencies emerged out of new hope for digital payments, and blockchain makes it all possible. It can be hard to envision the implications of a decentralized currency. DApps represent a whole new vision of the internet completely unlike its current iteration. Digital assets such as cryptocurrencies, smart contracts, and NFTs are the core building blocks of decentralized applications (DApps). Web3.js is a collection of libraries that allow you to interact with a local or remote Ethereum node using HTTP or IPC connections, which serves as the backbone to develop DApps.

In this experiment, we design, build, and deploy a **Decentralized Certificate Verification DApp (CertVerify)** using **Solidity**, **Truffle Suite**, **Ganache**, and **Web3.js**.

---

## 1. Theoretical Concepts & Background

### 1.1 Blockchain
A blockchain is an auditable and irreversible database where data can only be appended. In a blockchain, data is structured into cryptographic blocks, where each block contains the cryptographic hash of the previous block, timestamps, and transaction data, forming an immutable chain of records.

### 1.2 Ethereum & Ethereum Virtual Machine (EVM)
Ethereum is an open-source, decentralized platform built on blockchain technology that enables the execution of smart contracts. It is not only a cryptocurrency platform (Ether / ETH) but also a distributed state machine that executes program bytecode deterministically across all nodes. The **Ethereum Virtual Machine (EVM)** serves as the decentralized runtime environment for executing smart contracts, preventing fraud and single-point-of-failure tampering.

### 1.3 Smart Contracts
Smart contracts are self-executing programs compiled and executed by the EVM and deployed to the blockchain. They execute automatically when predefined conditions are satisfied without requiring intermediary third parties. Transactions processed by smart contracts are immutable, auditable, and traceable. 

**Solidity** is the primary object-oriented, high-level programming language used to develop smart contracts on the Ethereum blockchain.

### 1.4 Decentralized Applications (DApps)
A DApp is an application that runs on a decentralized peer-to-peer network rather than centralized servers. It is not governed by a single authority and operates securely via smart contracts.

A decentralized application consists of three primary components:
1. **Frontend (User Interface)**: Collects input from the user (HTML5/CSS3/JavaScript) and dispatches requests to the smart contract.
2. **Wallet / Provider**: Authenticates transactions, signs operations with cryptographic private keys, and communicates with the blockchain node (Ganache RPC / MetaMask).
3. **Smart Contracts**: The on-chain backend logic containing the state variables, functions, and rules of the application.

---

> 📷 **IMAGE PLACEHOLDER 1: DApp Architecture Diagram**  
> **Image File Name:** `images/01_dapp_architecture_diagram.png`  
> **What to upload here:** A diagram showing the interaction flow between the Client Browser (Web3.js App), JSON-RPC bridge / Provider, and the Ethereum Blockchain Node.  
> *(Reference: PDF Page 3 / Page 66 diagram)*

---

### 1.5 Key DApp Advantages
* **No Downtime**: DApps run on a distributed peer-to-peer network; if an individual node fails, the network continues to operate without service interruption.
* **Transparency & Immutability**: All records are permanently stored on a public distributed ledger, preventing unauthorized alterations or tampering.
* **Open Source & Trustless**: Smart contract logic is verifiable by anyone, removing the need for blind trust in centralized institutions.

---

## 2. Web3.js Architecture

**Web3.js** is a collection of JavaScript libraries that enables web applications to interact with an Ethereum node via JSON-RPC over HTTP, WebSocket, or IPC protocols. It abstracts raw JSON-RPC commands into intuitive JavaScript APIs.

---

> 📷 **IMAGE PLACEHOLDER 2: Web3.js Communication Flow**  
> **Image File Name:** `images/02_web3js_node_interaction.png`  
> **What to upload here:** Diagram illustrating the JavaScript client sending JSON-RPC requests via Web3.js to Ethereum network nodes and the EVM.  
> *(Reference: PDF Page 4 / Page 67 diagram)*

---

### 2.1 Core Web3.js Packages
* `web3.eth`: Interacts directly with the Ethereum blockchain, smart contracts, transactions, and block data.
* `web3.utils`: Provides essential utility functions such as converting string literals to hexadecimal hashes (`keccak256`) and converting Ether to Wei.
* `web3.*.net`: Queries network properties such as active Network ID (`net.getId()`) and peer count.
* `web3.bzz`: Interacts with decentralized storage protocols (such as Swarm).
* `web3.shh`: Interacts with the Whisper protocol for peer-to-peer messaging.

---

## 3. Practical Implementation — Step-by-Step

---

### Step 1: Environment Setup & Prerequisites
The development workflow requires the following tools:
* **Node.js & npm**: JavaScript runtime environment to manage project dependencies.
* **Truffle Suite**: Comprehensive framework for compiling, deploying, and testing smart contracts.
* **Ganache**: Local personal Ethereum blockchain simulating accounts, balances, and block mining.
* **Solc**: Solidity compiler (version `0.8.19`).

#### Installation Commands:
```bash
# Verify Node.js and npm
node -v
npm -v

# Install Truffle framework globally
npm install -g truffle
```

---

> 📷 **IMAGE PLACEHOLDER 3: Node.js and Truffle Installation**  
> **Image File Name:** `images/03_truffle_installation.png`  
> **What to upload here:** Screenshot of Command Prompt / PowerShell showing `node -v` and the terminal output of `npm install -g truffle` completing successfully.  
> *(Reference: PDF Page 7 / Page 70)*

---

> 📷 **IMAGE PLACEHOLDER 4: Ganache Local Blockchain Setup**  
> **Image File Name:** `images/04_ganache_setup.png`  
> **What to upload here:** Screenshot of the Ganache GUI installation / startup window showing the **"Quickstart Ethereum"** button and workspace setup.  
> *(Reference: PDF Page 8 / Page 71)*

---

### Step 2: Project Initialization & Directory Scaffolding

Create a new directory for the application and initialize the Truffle project structure:
```bash
# Create project folder and navigate inside
mkdir DApp
cd DApp

# Initialize Truffle scaffold
truffle init
```

---

> 📷 **IMAGE PLACEHOLDER 5: Truffle Init Command Execution**  
> **Image File Name:** `images/05_truffle_init_terminal.png`  
> **What to upload here:** Screenshot of the terminal executing `truffle init` showing `Starting init...` and `Init successful, sweet!`.  
> *(Reference: PDF Page 9 / Page 72)*

---

> 📷 **IMAGE PLACEHOLDER 6: Initial Project File Structure**  
> **Image File Name:** `images/06_initial_file_structure.png`  
> **What to upload here:** Screenshot of VS Code explorer showing the initialized directory structure: `contracts/`, `migrations/`, `test/`, and `truffle-config.js`.  
> *(Reference: PDF Page 9 / Page 72)*

---

### Step 3: Smart Contract Development (`contracts/CertVerify.sol`)

Create the core smart contract in `contracts/CertVerify.sol`. This contract handles credential storage, role-based access control, cryptographic hash verification, and lifecycle revocation.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertVerify {

    // State Variables
    address public owner;
    mapping(address => bool) public issuers;
    mapping(bytes32 => Certificate) private certificates;

    // Certificate Data Model
    struct Certificate {
        string  recipientName;
        bytes32 certificateHash;
        address issuerAddress;
        uint256 issuedDate;
        uint256 expiryDate;
        string  courseName;
        string  grade;
        bool    isActive;
    }

    // Events
    event CertificateIssued(
        bytes32 indexed certHash,
        address indexed issuer,
        string  recipientName,
        string  courseName
    );
    event CertificateRevoked(bytes32 indexed certHash, address indexed revokedBy);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    modifier onlyIssuer() {
        require(issuers[msg.sender], "Only authorized issuers can call this");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
        issuers[msg.sender] = true;
    }

    // Issue Certificate Function (State-modifying, costs gas)
    function issueCertificate(
        string  memory _recipientName,
        string  memory _courseName,
        string  memory _grade,
        uint256        _expiryDate
    ) public onlyIssuer returns (bytes32) {
        require(bytes(_recipientName).length > 0, "Recipient name required");
        require(bytes(_courseName).length > 0,    "Course name required");
        require(_expiryDate > block.timestamp,    "Expiry must be in the future");

        bytes32 certHash = keccak256(
            abi.encodePacked(
                _recipientName,
                _courseName,
                _grade,
                msg.sender,
                block.timestamp
            )
        );

        require(certificates[certHash].issuedDate == 0, "Certificate already exists");

        certificates[certHash] = Certificate({
            recipientName:   _recipientName,
            certificateHash: certHash,
            issuerAddress:   msg.sender,
            issuedDate:      block.timestamp,
            expiryDate:      _expiryDate,
            courseName:      _courseName,
            grade:           _grade,
            isActive:        true
        });

        emit CertificateIssued(certHash, msg.sender, _recipientName, _courseName);
        return certHash;
    }

    // Verify Certificate Function (Read-only, 0 gas)
    function verifyCertificate(bytes32 _certHash)
        public view
        returns (bool valid, string memory status, Certificate memory cert)
    {
        cert = certificates[_certHash];

        if (cert.issuedDate == 0) {
            return (false, "NOT_FOUND", cert);
        }
        if (!cert.isActive) {
            return (false, "REVOKED", cert);
        }
        if (block.timestamp > cert.expiryDate) {
            return (false, "EXPIRED", cert);
        }
        return (true, "VALID", cert);
    }

    // Revoke Certificate Function (State-modifying, costs gas)
    function revokeCertificate(bytes32 _certHash) public onlyIssuer {
        require(certificates[_certHash].issuedDate != 0, "Certificate not found");
        require(certificates[_certHash].isActive,         "Already revoked");
        certificates[_certHash].isActive = false;
        emit CertificateRevoked(_certHash, msg.sender);
    }
}
```

---

> 📷 **IMAGE PLACEHOLDER 7: Smart Contract Source Code**  
> **Image File Name:** `images/07_smart_contract_code.png`  
> **What to upload here:** Screenshot of VS Code displaying `contracts/CertVerify.sol` with syntax highlighting.  
> *(Reference: PDF Page 10 / Page 73)*

---

### Step 4: Migration Configuration (`migrations/1_deploy_certverify.js`)

Create the migration deployment script in `migrations/1_deploy_certverify.js`:

```javascript
const CertVerify = artifacts.require("CertVerify");

module.exports = function (deployer) {
  deployer.deploy(CertVerify);
};
```

---

### Step 5: Compilation and Network Configuration

#### 5.1 Compile Smart Contracts
Compile the Solidity source code into EVM bytecode and ABI artifacts:
```bash
truffle compile
```

---

> 📷 **IMAGE PLACEHOLDER 8: Truffle Compile Terminal Output**  
> **Image File Name:** `images/08_truffle_compile_output.png`  
> **What to upload here:** Screenshot of terminal showing `truffle compile` compiling `CertVerify.sol` successfully with solc version `0.8.19`.  
> *(Reference: PDF Page 10 / Page 73)*

---

#### 5.2 Configure `truffle-config.js`
Configure the development network to target Ganache on port `7545` and set `contracts_build_directory` to automatically route compiled JSON artifacts to the frontend directory:

```javascript
module.exports = {
  contracts_build_directory: "./client/src/contracts",

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },

  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },
  },
};
```

---

> 📷 **IMAGE PLACEHOLDER 9: Ganache Running State**  
> **Image File Name:** `images/09_ganache_active_accounts.png`  
> **What to upload here:** Screenshot of the active Ganache GUI window showing **RPC SERVER HTTP://127.0.0.1:7545**, Network ID `5777`, and the 10 pre-funded test accounts with 100 ETH.  
> *(Reference: PDF Page 11 / Page 74)*

---

> 📷 **IMAGE PLACEHOLDER 10: Truffle Config Code**  
> **Image File Name:** `images/10_truffle_config_code.png`  
> **What to upload here:** Screenshot of `truffle-config.js` in VS Code showing the development network mapping to port `7545`.  
> *(Reference: PDF Page 11 / Page 74)*

---

### Step 6: Deploy Contract to Ganache Network

Deploy the contract onto the local blockchain:
```bash
truffle migrate --network development
```

---

> 📷 **IMAGE PLACEHOLDER 11: Truffle Migration & Deployment Terminal Output**  
> **Image File Name:** `images/11_truffle_migrate_output.png`  
> **What to upload here:** Screenshot of terminal executing `truffle migrate` showing the deployment of `CertVerify`, transaction hash, contract address (`0xAB6ee...`), block number, and gas consumed.  
> *(Reference: PDF Page 12 / Page 75)*

---

### Step 7: Frontend Setup & Web3.js Integration

#### 7.1 Setup Client Environment & Dependencies
Initialize the frontend inside `client/` and install Web3.js and lite-server:
```bash
mkdir client
cd client
npm init -y
npm install web3
npm install lite-server --save-dev
```

---

> 📷 **IMAGE PLACEHOLDER 12: Client Dependencies Installation**  
> **Image File Name:** `images/12_npm_install_client.png`  
> **What to upload here:** Screenshot of terminal showing `npm install web3` and `npm install lite-server` completed inside the `client` folder.  
> *(Reference: PDF Page 13 / Page 76)*

---

#### 7.2 Web3 Instance & Contract Loader (`client/src/utils.js`)
Create the Web3.js helper to instantiate the connection and dynamically resolve the contract address from the network ID:

```javascript
export async function getWeb3() {
  const provider = new window.Web3.providers.HttpProvider("http://127.0.0.1:7545");
  const web3 = new window.Web3(provider);
  return web3;
}

export async function getContract(web3) {
  const response = await fetch("./src/contracts/CertVerify.json");
  const certVerifyArtifact = await response.json();
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = certVerifyArtifact.networks[networkId];

  if (!deployedNetwork || !deployedNetwork.address) {
    throw new Error(`Contract not deployed on network ${networkId}`);
  }

  const contract = new web3.eth.Contract(
    certVerifyArtifact.abi,
    deployedNetwork.address
  );

  return { contract, address: deployedNetwork.address };
}

export async function getCurrentAccount(web3) {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
}
```

---

#### 7.3 Frontend Interaction Logic (`client/src/index.js`)
Implement contract method dispatching:
* **State Mutation (`.send()`)**: For certificate issuance and revocation (costs Gas, requires sender signature).
* **State Query (`.call()`)**: For public instant verification (costs 0 Gas, instant read).

```javascript
import { getWeb3, getContract, getCurrentAccount } from "./utils.js";

let web3, contract, currentAccount;

window.addEventListener("load", async () => {
  web3 = await getWeb3();
  const data = await getContract(web3);
  contract = data.contract;
  currentAccount = await getCurrentAccount(web3);

  document.getElementById("current-account").textContent = currentAccount;
  document.getElementById("contract-address").textContent = data.address;
});

// Issue Certificate
document.getElementById("issue-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("recipient-name").value;
  const course = document.getElementById("course-name").value;
  const grade = document.getElementById("grade").value;
  const expiryTs = Math.floor(new Date(document.getElementById("expiry-date").value).getTime() / 1000);

  const receipt = await contract.methods
    .issueCertificate(name, course, grade, expiryTs)
    .send({ from: currentAccount, gas: 300000 });

  const certHash = receipt.events.CertificateIssued.returnValues.certHash;
  alert("Certificate Issued! Hash: " + certHash);
});

// Verify Certificate
document.getElementById("verify-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const hash = document.getElementById("cert-hash").value;
  const result = await contract.methods.verifyCertificate(hash).call();
  alert("Verification Status: " + result.status + " | Recipient: " + result.cert.recipientName);
});
```

---

> 📷 **IMAGE PLACEHOLDER 13: Final Project Explorer Structure**  
> **Image File Name:** `images/13_final_project_structure.png`  
> **What to upload here:** Screenshot of the complete VS Code file explorer showcasing all project folders (`contracts/`, `migrations/`, `client/src/`, `client/css/`, `client/src/contracts/CertVerify.json`, `truffle-config.js`).  
> *(Reference: PDF Page 15 / Page 78)*

---

### Step 8: Launching the Application

Start the local lite-server development server from the `client/` directory:
```bash
cd client
npm start
```

---

> 📷 **IMAGE PLACEHOLDER 14: Lite-Server Terminal Execution**  
> **Image File Name:** `images/14_lite_server_terminal.png`  
> **What to upload here:** Screenshot of terminal showing `lite-server` / Browsersync serving files from `./` and listening at `http://localhost:3000`.  
> *(Reference: PDF Page 16 / Page 79)*

---

## 4. Results & Demonstration

---

> 📷 **IMAGE PLACEHOLDER 15: Running DApp Web UI (Issuance)**  
> **Image File Name:** `images/15_dapp_ui_issuance.png`  
> **What to upload here:** Screenshot of the browser at `http://localhost:3000` showing the CertVerify web interface with connected account, contract address, and the filled **Issue Certificate** form.  
> *(Reference: PDF Page 17 / Page 80)*

---

> 📷 **IMAGE PLACEHOLDER 16: Certificate Verification Result (Valid Status)**  
> **Image File Name:** `images/16_dapp_ui_verification_success.png`  
> **What to upload here:** Screenshot of the browser displaying a verified certificate showing the green **"AUTHENTIC & VALID CERTIFICATE"** status badge, student details, course, grade, issuer address, and timestamp.

---

> 📷 **IMAGE PLACEHOLDER 17: Certificate Revocation Result**  
> **Image File Name:** `images/17_dapp_ui_revocation.png`  
> **What to upload here:** Screenshot of the browser showing the certificate verification status returning red **"CERTIFICATE HAS BEEN REVOKED"** after performing a revocation transaction.

---

## 5. Summary Guide: Complete Image Upload Checklist

| Image No. | Suggested File Name | Section | Description of Screenshot Needed | Reference in PDF |
|:---|:---|:---|:---|:---|
| **Img 1** | `01_dapp_architecture_diagram.png` | 1.4 DApp Architecture | Diagram showing Browser / Web3.js / JSON-RPC / Ethereum node architecture | Page 66 (Page 3) |
| **Img 2** | `02_web3js_node_interaction.png` | 2.0 Web3.js Architecture | Diagram showing Web3.js communication with peer-to-peer EVM nodes | Page 67 (Page 4) |
| **Img 3** | `03_truffle_installation.png` | Step 1 Environment | Terminal output verifying `node -v` and `npm install -g truffle` | Page 70 (Page 7) |
| **Img 4** | `04_ganache_setup.png` | Step 1 Environment | Ganache desktop application installer or initial Quickstart window | Page 71 (Page 8) |
| **Img 5** | `05_truffle_init_terminal.png` | Step 2 Scaffolding | Terminal output showing `truffle init` command execution | Page 72 (Page 9) |
| **Img 6** | `06_initial_file_structure.png` | Step 2 Scaffolding | VS Code sidebar showing initial `contracts/`, `migrations/`, `test/` | Page 72 (Page 9) |
| **Img 7** | `07_smart_contract_code.png` | Step 3 Contract Code | VS Code editor showing `contracts/CertVerify.sol` Solidity code | Page 73 (Page 10) |
| **Img 8** | `08_truffle_compile_output.png` | Step 5 Compilation | Terminal output showing successful `truffle compile` with solc `0.8.19` | Page 73 (Page 10) |
| **Img 9** | `09_ganache_active_accounts.png` | Step 5 Network Setup | Ganache GUI showing RPC `127.0.0.1:7545`, Network ID `5777`, and 10 accounts | Page 74 (Page 11) |
| **Img 10** | `10_truffle_config_code.png` | Step 5 Network Setup | VS Code editor showing `truffle-config.js` network & compiler configuration | Page 74 (Page 11) |
| **Img 11** | `11_truffle_migrate_output.png` | Step 6 Deployment | Terminal output showing `truffle migrate` deployment details and contract address | Page 75 (Page 12) |
| **Img 12** | `12_npm_install_client.png` | Step 7 Client Setup | Terminal output showing `npm install web3 lite-server` inside `client/` | Page 76 (Page 13) |
| **Img 13** | `13_final_project_structure.png` | Step 7 Client Setup | VS Code sidebar showing the complete final directory structure | Page 78 (Page 15) |
| **Img 14** | `14_lite_server_terminal.png` | Step 8 Launching App | Terminal output of `npm start` running `lite-server` on `http://localhost:3000` | Page 79 (Page 16) |
| **Img 15** | `15_dapp_ui_issuance.png` | 4. Results | Browser running DApp at `localhost:3000` with Issue Certificate panel | Page 80 (Page 17) |
| **Img 16** | `16_dapp_ui_verification_success.png` | 4. Results | Browser showing verified green certificate status and recipient details | Live Output |
| **Img 17** | `17_dapp_ui_revocation.png` | 4. Results | Browser showing revoked status for an invalidated certificate | Live Output |

---

## 6. Conclusion
In this experiment, we successfully built and deployed a decentralized certificate verification application (**CertVerify**). We demonstrated smart contract creation using **Solidity**, automated compilation and migration to a local **Ganache** Ethereum blockchain using **Truffle**, and established bidirectional browser-to-blockchain communication using **Web3.js**. The application guarantees tamper-proof record keeping, public trustless verification, and decentralized lifecycle management.
