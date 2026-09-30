---
name: project-spec
description: Authoritative project specifications, functional requirements, technical standards, and non-negotiable architectural constraints for the CertVerify DApp.
---

# Project Specification Skill

## Objective
Authoritative reference specification for the Decentralized Certificate Verification System (CertVerify).

## Target Scope
- **Academic Context**: Semester VII Bachelor in Computer Engineering / Technology (BCT).
- **Core Problem**: Certificate fraud, forgery, unauthorized degree issuance, and slow paper-based verification.
- **Solution**: Immutable, public, decentralized verification protocol implemented on Ethereum.

## Technical Specifications
- **Solidity Version**: `^0.8.19`
- **Truffle Suite**: v5.x+
- **Ganache RPC Port**: `7545` (Network ID: `*` or `5777`)
- **Web3.js**: v1.10.x
- **Frontend**: Vanilla ES6+ JavaScript, Semantic HTML5, CSS3
- **Development Server**: `lite-server` (Port 3000)

## Required Functional Capabilities
1. **Certificate Issuance**:
   - Authorized issuers only (`onlyIssuer`).
   - Fields: Recipient Name, Course Name, Grade, Issue Date, Expiration Date, Issuer Address, Status.
   - Output: 32-byte cryptographic hash (`bytes32`).
2. **Instant Public Verification**:
   - Available to anyone without wallet login or gas expenditure (`view` function).
   - Validates existence, expiry, and active status.
3. **Revocation Capability**:
   - Allows issuing authority to invalidate previously minted certificates.
4. **Issuer Access Management**:
   - Contract owner can add or revoke issuer privileges.

## Directory Structure Specification
```text
DApp/
├── contracts/
│   └── CertVerify.sol
├── migrations/
│   └── 1_deploy_certverify.js
├── test/
│   └── CertVerify.test.js
├── client/
│   ├── index.html
│   ├── bs-config.js
│   ├── package.json
│   ├── css/
│   │   └── styles.css
│   └── src/
│       ├── index.js
│       ├── utils.js
│       └── contracts/
│           └── CertVerify.json
├── truffle-config.js
└── .agents/
    └── skills/
        ├── project-orchestrator/
        ├── solidity-contract/
        ├── truffle-ganache-deployment/
        ├── web3-integration/
        ├── frontend-ui/
        ├── testing-debugging/
        ├── security-review/
        ├── documentation-viva/
        ├── final-integration/
        └── project-spec/
```
