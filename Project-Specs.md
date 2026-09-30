---
name: certverify-project-spec
description: Provides the authoritative project specification for the CertVerify blockchain certificate verification DApp and should be consulted when implementation decisions are ambiguous.
---

# CertVerify Project Specification

## Purpose
Create a decentralized certificate verification DApp for a local Ethereum-compatible development environment.

## Core stack
- Solidity
- Truffle
- Ganache
- Web3.js
- Node.js/npm
- HTML
- CSS
- JavaScript

## Core blockchain model
A certificate is stored and verified using blockchain-backed state. The issuer is identified by an Ethereum address. Certificate records include identity/course/grade/expiry information and active/revoked status.

## Required smart-contract operations
- issue certificate
- verify certificate
- retrieve certificate
- revoke certificate

## Required technical concepts
- Ethereum addresses
- accounts
- transactions vs calls
- timestamps
- events
- structs
- mappings
- modifiers
- `msg.sender`
- `block.timestamp`
- `require`
- `keccak256`

## Required frontend concepts
- form inputs
- DOM manipulation
- event listeners
- validation
- async/await
- Web3 provider
- Web3 contract instance
- `.call()`
- `.send()`

## Local network
Use Ganache. The supplied specification identifies `http://localhost:7545` as the default RPC, but the implementation must use the actual running RPC endpoint if it differs.

## Reference implementation shape
```text
certverify/
├── contracts/
│   ├── Migrations.sol
│   └── CertVerify.sol
├── migrations/
│   ├── 1_initial_migration.js
│   └── 2_certverify_migration.js
├── client/
│   ├── index.html
│   ├── src/
│   │   ├── index.js
│   │   └── utils.js
│   └── contracts/
│       └── CertVerify.json
└── truffle-config.js
```

## Educational scope
Keep the implementation understandable to a beginner/intermediate student. Prefer a small, auditable contract and clear frontend logic over unnecessary architecture.
