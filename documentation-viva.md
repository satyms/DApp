---
name: certverify-documentation-viva
description: Produces the CertVerify project's README, experiment documentation, architecture explanation, demo flow, screenshots checklist, and viva preparation from the implemented code.
---

# Documentation & Viva Skill

## README sections
Generate:
1. Project title
2. Problem statement
3. Objective
4. Features
5. Technology stack
6. Architecture
7. Project structure
8. Setup prerequisites
9. Installation commands
10. Ganache configuration
11. Truffle compile/deploy commands
12. Frontend run command
13. Testing
14. Limitations
15. Viva questions

## Architecture explanation
Explain:
```text
User
  ↓
HTML/CSS/JavaScript
  ↓
Web3.js
  ↓
Ganache RPC
  ↓
Ethereum-compatible EVM
  ↓
CertVerify Solidity Contract
```

Clearly distinguish:
- read operation -> `.call()`
- state-changing operation -> `.send()`

## Demo sequence
Prepare a short live demonstration:
1. Start Ganache.
2. Start frontend.
3. Show connected account.
4. Issue a certificate.
5. Show transaction confirmation.
6. Verify the certificate.
7. Revoke it.
8. Verify again and show revoked state.
9. Demonstrate an invalid/unknown certificate.
10. Show Ganache transaction history.

## Viva questions
Prepare concise answers for:
- Why blockchain?
- What is Ethereum/EVM?
- What is a smart contract?
- What is Solidity?
- What is Ganache?
- What is Truffle?
- What is Web3.js?
- Difference between `.call()` and `.send()`?
- What is `msg.sender`?
- What is `block.timestamp`?
- How is certificate integrity preserved?
- How does revocation work?
- What happens if the certificate expires?
- What happens if a non-issuer tries to issue?
- What is gas?
- What is an event?
