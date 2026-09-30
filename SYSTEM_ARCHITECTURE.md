# Certificate Verification Dapp - System Architecture

## 1. Overview

A simple Ethereum smart contract application to issue and verify certificates on blockchain. Built using Solidity, Truffle, Ganache, and Web3.js - following the same pattern as the Greeting dapp.

```
Browser (localhost:3000)
    ↓
index.html / index.js / utils.js
    ↓
Web3.js (JSON-RPC calls)
    ↓
Ganache (localhost:7545)
    ↓
CertVerify.sol Smart Contract
    ↓
Blockchain State (Certificate Storage)
```

---

## 2. Components

### 2.1 Smart Contract (CertVerify.sol)

```solidity
contract CertVerify {
    address issuer              // Contract owner/creator
    
    struct Certificate {
        string recipientName    // Student/recipient name
        string courseName       // Course or program name
        string grade            // Grade/score achieved
        uint256 issuedDate      // Timestamp when issued
        uint256 expiryDate      // Certificate expiry date
        bool isActive           // Active (true) or revoked (false)
    }
    
    mapping(bytes32 => Certificate) certificates  // Store all certificates
    
    Functions:
    ├── issueCertificate()      // Issue new certificate (only issuer)
    ├── verifyCertificate()     // Check if certificate is valid
    ├── getCertificate()        // Get certificate details
    └── revokeCertificate()     // Revoke certificate (only issuer)
}
```

**Key Points**:
- Certificate identified by unique hash
- Only contract creator can issue/revoke
- Anyone can verify certificates
- Certificates expire automatically

---

## 3. Frontend Files

### index.html
- Two input forms:
  1. **Issue Form**: For issuer to create certificates
  2. **Verify Form**: For anyone to verify certificates
- Display results and messages

### index.js  
- Collect form inputs
- Call smart contract methods via Web3.js
- Display results to user

### utils.js
- `getWeb3()` - Connect to Ganache RPC
- `getContract()` - Load contract ABI and create instance
- `getCurrentAccount()` - Get active Ethereum account

---

## 4. Data Flow

### Issue Certificate
```
Form Input
  ↓ name, course, grade, expiry
  ↓
index.js validates and calls:
  contract.methods.issueCertificate(...)
  ↓
Smart Contract:
  - Check if caller is issuer
  - Hash the inputs to create certificate ID
  - Store in mapping
  - Emit event
  ↓
Ganache mines block
  ↓
Frontend shows: "Certificate Issued"
Certificate Hash: 0x12ab...cd34
```

### Verify Certificate
```
Form Input
  ↓ certificate hash
  ↓
index.js calls:
  contract.methods.verifyCertificate(hash)
  ↓
Smart Contract:
  - Look up certificate
  - Check if active
  - Check if expired
  - Return details
  ↓
Frontend displays:
  ✓ VALID - Shows all details
  ✗ EXPIRED - Shows expiry message
  ✗ REVOKED - Shows revoked message
  ✗ NOT FOUND - Shows invalid hash message
```

---

## 5. Project Folder Structure

```
dapp-demo/
├── contracts/
│   ├── Migrations.sol          (Provided by Truffle)
│   └── CertVerify.sol          (Your smart contract)
│
├── migrations/
│   ├── 1_initial_migration.js  (Provided by Truffle)
│   └── 2_certverify_migration.js (Deploy CertVerify)
│
├── client/
│   ├── src/
│   │   ├── index.html          (UI)
│   │   ├── index.js            (Logic)
│   │   ├── utils.js            (Web3 helpers)
│   │   └── styles.css          (Styling)
│   │
│   ├── contracts/
│   │   └── CertVerify.json     (Contract ABI - auto-generated)
│   │
│   ├── node_modules/           (npm packages)
│   └── package.json
│
├── build/                       (Auto-generated after compile)
├── truffle-config.js
└── package.json
```

---

## 6. Setup Steps

### Step 1: Initialize Project
```bash
mkdir dapp-demo
cd dapp-demo
truffle init
npm install
```

### Step 2: Create Smart Contract
Place `CertVerify.sol` in `contracts/` folder

### Step 3: Create Migration
Place `2_certverify_migration.js` in `migrations/` folder

### Step 4: Compile & Deploy
```bash
# Terminal 1: Start Ganache
ganache-cli

# Terminal 2: Compile contracts
truffle compile

# Deploy to Ganache
truffle migrate --network development
```

### Step 5: Setup Frontend
```bash
cd client
npm init
npm install web3
npm install lite-server --save-dev
npm install jquery
```

### Step 6: Add Frontend Files
- Create `src/index.html`
- Create `src/index.js`
- Create `src/utils.js`
- Copy compiled contract ABI to `contracts/CertVerify.json`

### Step 7: Run Application
```bash
# In client/ folder
npm start
```

Opens at `http://localhost:3000`

---

## 7. Smart Contract Functions

### issueCertificate()
```
Input:
  - recipientName: string
  - courseName: string
  - grade: string
  - expiryDate: uint256 (Unix timestamp)

Process:
  1. Verify msg.sender == issuer
  2. Hash inputs → certHash
  3. Store Certificate struct
  4. Emit CertificateIssued event

Output:
  - Certificate hash (unique ID)
  - Transaction receipt
```

### verifyCertificate()
```
Input:
  - certHash: bytes32

Process:
  1. Look up certificate
  2. Check if isActive == true
  3. Check if block.timestamp <= expiryDate

Output:
  - true/false (valid or not)
  - Emit CertificateVerified event
```

### getCertificate()
```
Input:
  - certHash: bytes32

Output:
  - recipientName
  - courseName
  - grade
  - issuedDate
  - expiryDate
  - isActive
```

### revokeCertificate()
```
Input:
  - certHash: bytes32

Process:
  1. Verify msg.sender == issuer
  2. Set isActive = false

Output:
  - Certificate marked as revoked
```

---

## 8. Key Concepts Used

1. **Struct** - Define Certificate data structure
2. **Mapping** - Store certificates by hash
3. **Events** - Log important actions (CertificateIssued, CertificateVerified)
4. **Function Modifiers** - Control who can call functions
5. **Ethereum Addresses** - Identify issuer
6. **Timestamps** - Track issue and expiry dates
7. **Hashing** - Generate unique certificate IDs

---

## 9. Testing the Dapp

### Issue Certificate
1. Fill out "Issue Certificate" form
2. Click "Submit"
3. Note the certificate hash shown
4. Check Ganache shows new transaction

### Verify Certificate
1. Copy certificate hash from issue step
2. Go to "Verify Certificate" form
3. Paste hash
4. Click "Verify"
5. Should show all certificate details

### Revoke Certificate
1. Issuer can revoke using certificate hash
2. After revoke, verification will fail

---

## 10. Differences from Greeting Dapp

| Aspect | Greeting | Certificate |
|--------|----------|-------------|
| Storage | Single string | Struct mapping |
| Functions | Say/get | Issue/verify/revoke |
| Data | One greeting | Multiple certificates |
| Use Case | Demo | Real functionality |
| Complexity | Basic | Mini project |

---

**Project Type**: College Mini Project (Experiment 8)  
**Framework**: Truffle + Solidity + Web3.js  
**Network**: Ganache (Local Testing)  
**Status**: Simple, Educational Implementation