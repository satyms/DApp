# Project Context: Decentralized Certificate Verification DApp (CertVerify)

## 1. Project Overview & Objective

The **Decentralized Certificate Verification System (CertVerify)** is a blockchain-based Web3 application designed for educational and professional certificate issuance, verification, and revocation. Built for Semester VII Bachelor in Computer Engineering / Technology (BCT), the system leverages Ethereum smart contracts to ensure certificate immutability, tamper resistance, and decentralized verification without reliance on a centralized database or intermediary authority.

### Key Objectives
* **Certificate Issuance**: Authorize designated educational institutions (issuers) to record tamper-proof certificate credentials directly on the Ethereum blockchain.
* **Instant Verification**: Allow any public user (verifier) to inspect certificate validity instantly using unique cryptographic hashes.
* **Revocation & Expiry Control**: Support lifecycle management including certificate revocation and automated timestamp-based expiration checks.
* **Educational Scope**: Demonstrates core blockchain engineering principles (Solidity, EVM, RPC calls, Web3.js integration, Truffle migrations, and local Ganache consensus).

---

## 2. Workspace File & Directory Structure

```text
d:\SEM VII\BCT\DApp\
├── README.md                                       # Basic project title header
├── SKILLS_REQUIRED.md                              # Comprehensive 15-category syllabus & developer roadmap
├── SYSTEM_ARCHITECTURE.md                         # Authoritative architecture, data flows, and tech stack blueprint
├── context.md                                      # Consolidated master project documentation & context
├── .freebuff/
│   └── project-id                                  # Internal project tracking identifier
└── certverify-antigravity-skills/                  # Modular 10-skill bundle for Antigravity AI agents
    ├── README.md                                   # Instructions for installing skills into workspace
    ├── 01-project-orchestrator/SKILL.md            # Master workflow coordinator
    ├── 02-solidity-contract/SKILL.md               # CertVerify.sol smart contract specification
    ├── 03-truffle-ganache-deployment/SKILL.md      # Truffle compilation & Ganache deployment pipeline
    ├── 04-web3-integration/SKILL.md                # Web3.js provider setup & contract instance bindings
    ├── 05-frontend-ui/SKILL.md                     # HTML5/CSS3/jQuery user interface specifications
    ├── 06-testing-debugging/SKILL.md               # Unit test matrix & troubleshooting guide
    ├── 07-security-review/SKILL.md                 # Security audit checklist & access control rules
    ├── 08-documentation-viva/SKILL.md              # Viva preparation Q&A & presentation guide
    ├── 09-final-integration/SKILL.md               # Smoke testing & final delivery acceptance checks
    └── 10-project-spec/SKILL.md                    # Core project specifications & non-negotiable rules
```

---

## 3. Technology Stack & Environment

| Component | Technology | Version / Specification | Role in System |
| :--- | :--- | :--- | :--- |
| **Smart Contract Language** | Solidity | `^0.8.0` | Implements business logic and state storage on EVM |
| **Development Framework** | Truffle Suite | `v5.x+` | Compiles contracts, manages migrations, runs unit tests |
| **Local Blockchain Node** | Ganache CLI / GUI | Port `7545` (or `8545`) | Simulates local Ethereum network with pre-funded accounts |
| **Blockchain Bridge** | Web3.js | `v1.6.1+` | Communicates via JSON-RPC between browser & Ethereum node |
| **Web Server** | Lite-server | Node-based | Serves frontend static assets locally |
| **UI Stack** | HTML5, CSS3, jQuery | Vanilla / Web3 | Interactive panels for Issuers and Verifiers |
| **Runtime & Tooling** | Node.js / npm | LTS | Dependency management and script runner |

---

## 4. System Architecture & Component Design

### System Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface Layer                     │
│         (HTML5 / CSS3 / jQuery / index.html / index.js)     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ JSON-RPC over HTTP
                               ▼
                    ┌──────────────────────┐
                    │    Web3.js Library   │
                    │   (client/utils.js)  │
                    └──────────────────────┘
                               │
                               │ RPC Port 7545
                               ▼
                    ┌──────────────────────────────┐
                    │   Ganache Local Network      │
                    └──────────────────────────────┘
                               │
                    ┌──────────────────────────────┐
                    │  Ethereum Virtual Machine    │
                    │         (EVM Runtime)        │
                    └──────────────────────────────┘
                               │
                    ┌──────────────────────────────┐
                    │    CertVerify Smart Contract │
                    │    (contracts/CertVerify.sol)│
                    └──────────────────────────────┘
```

### Data Flow Models

#### A. Certificate Issuance Workflow
1. **Issuer Action**: Issuer fills in recipient name, course, grade, and expiry date via the Issuer UI panel.
2. **Hashing & Preparation**: Frontend generates a unique certificate hash (`keccak256`) or passes parameters to Web3.js.
3. **Transaction Execution**: `contract.methods.issueCertificate(...).send({ from: currentAccount })` submits a signed transaction to Ganache.
4. **State Storage**: EVM executes `CertVerify.sol`, validates caller identity via `onlyIssuer`, creates a `Certificate` struct, and updates the `certificates` mapping.
5. **Event Emission**: Emits `CertificateIssued` event for off-chain indexing.
6. **Receipt**: UI receives mined transaction receipt and displays transaction hash and certificate ID to the issuer.

#### B. Certificate Verification Workflow
1. **Verifier Action**: User enters the certificate ID or hash in the Public Verifier UI panel.
2. **Read Call**: `contract.methods.verifyCertificate(certId).call()` executes a read-only call (costing 0 gas).
3. **Validation Checks**:
   - Check if certificate exists in `certificates` mapping.
   - Verify `isActive == true` (not revoked).
   - Check `block.timestamp < expiryDate` (not expired).
4. **Result Presentation**: UI presents verified status:
   - **Valid**: Green badge showing recipient, course, grade, issuer address, and date.
   - **Revoked**: Warning flag indicating certificate cancellation.
   - **Expired**: Warning flag indicating certificate passed expiration date.
   - **Invalid/Not Found**: Error flag for non-existent hashes.

---

## 5. Smart Contract Specifications (`CertVerify.sol`)

### Data Structures & State Variables
* `address public owner`: Deployer of the contract.
* `mapping(address => bool) public issuers`: Map of authorized issuer Ethereum addresses.
* `mapping(bytes32 => Certificate) public certificates`: Primary registry of certificates keyed by SHA-3/Keccak256 hash.

```solidity
struct Certificate {
    string recipientName;
    bytes32 certificateHash;
    address issuerAddress;
    uint256 issuedDate;
    uint256 expiryDate;
    string courseName;
    string grade;
    bool isActive;
}
```

### Key Functions
* `issueCertificate(address _recipient, string memory _name, bytes32 _hash, string memory _course, string memory _grade, uint256 _expiry)`: Writes new certificate to state.
* `verifyCertificate(bytes32 _hash) public view returns (Certificate memory)`: Evaluates certificate validity against revocation and expiration rules.
* `revokeCertificate(bytes32 _hash) public onlyIssuer`: Marks `isActive = false` to invalidate a certificate.
* `getCertificate(bytes32 _hash) public view returns (...)`: Retrieves certificate details.
* `addIssuer(address _newIssuer) public onlyOwner`: Grants issuing permissions.

---

## 6. Antigravity Skills Bundle Breakdown

The repository includes a dedicated 10-skill bundle located in `certverify-antigravity-skills/` designed to orchestrate step-by-step development using Google Antigravity AI agents:

1. **`01-project-orchestrator`**: Master coordinator enforcing step-by-step build sequence, clean code principles, and zero mock/fake responses.
2. **`02-solidity-contract`**: Guidelines for writing secure `CertVerify.sol` using Solidity `^0.8.0`, proper modifiers (`onlyIssuer`), and event logging.
3. **`03-truffle-ganache-deployment`**: Automated process for configuring `truffle-config.js`, writing migration scripts, and deploying contracts to Ganache.
4. **`04-web3-integration`**: Setup of `utils.js` for Web3 instantiation, account retrieval, and contract ABI loading.
5. **`05-frontend-ui`**: HTML5 UI split into Issuer Management Panel and Public Verification Tool.
6. **`06-testing-debugging`**: Automated Truffle/Mocha unit testing suite (`CertVerify.test.js`) and troubleshooting matrix.
7. **`07-security-review`**: Security audit covering access controls, timestamp manipulation risks, and input validation.
8. **`08-documentation-viva`**: Viva defense preparation guide covering core blockchain questions, immutability, and gas mechanics.
9. **`09-final-integration`**: Final smoke-testing procedure ensuring end-to-end functionality from UI to local blockchain.
10. **`10-project-spec`**: Non-negotiable technical requirements and reference implementation guidelines.

---

## 7. Target Directory Structure for DApp Implementation

When fully scaffolded and deployed, the workspace will follow this standardized layout:

```text
d:\SEM VII\BCT\DApp\
├── contracts/
│   ├── Migrations.sol
│   └── CertVerify.sol
├── migrations/
│   ├── 1_initial_migration.js
│   └── 2_deploy_certverify.js
├── test/
│   └── CertVerify.test.js
├── client/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── src/
│   │   ├── index.js
│   │   └── utils.js
│   ├── contracts/
│   │   └── CertVerify.json               # Compiled ABI & network artifacts copied post-migration
│   └── package.json
├── truffle-config.js
├── package.json
├── SYSTEM_ARCHITECTURE.md
├── SKILLS_REQUIRED.md
└── context.md
```

---

## 8. Deployment & Execution Workflow

### Step 1: Start Local Blockchain
Launch Ganache CLI or GUI listening on port 7545:
```bash
ganache-cli -p 7545
```

### Step 2: Compile & Migrate Smart Contracts
```bash
# Compile Solidity source files
truffle compile

# Deploy to Ganache development network
truffle migrate --network development
```

### Step 3: Configure Frontend & Serve
```bash
# Navigate to client directory
cd client

# Install dependencies (web3, lite-server, jquery)
npm install

# Launch development web server
npm start
```
Access the application at `http://localhost:3000`.

---

## 9. Viva Preparation & Core Knowledge Matrix

| Topic | Key Concept | Explanation |
| :--- | :--- | :--- |
| **Immutability** | Blockchain Storage | Once a block is mined, certificate records cannot be edited or deleted by database admins. |
| **Cryptographic Hashing** | Keccak-256 | Ensures that even a 1-character change in certificate content yields a completely different hash ID. |
| **Transactions vs. Calls** | `.send()` vs `.call()` | `.send()` mutates blockchain state and costs Gas; `.call()` reads state for free without mining. |
| **Access Control** | Modifiers | `onlyIssuer` restricts issuance and revocation rights to authorized Ethereum wallet addresses. |
| **Gas Optimization** | Read-only verification | Verification is designed as a `view` function, allowing instant, free verification for any public user. |

---
*Context generated on September 30, 2026 for Semester VII BCT DApp Project.*
