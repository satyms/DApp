---
name: documentation-viva
description: Comprehensive documentation standards, system architecture guides, and Viva examination preparation Q&A for the CertVerify blockchain project.
---

# Documentation & Viva Preparation Skill

## Goal
Prepare project documentation and viva defense resources covering all theoretical and practical concepts of the Ethereum certificate verification system.

## Core Viva Questions & Model Answers

### Q1: Why use blockchain instead of a traditional centralized database (like MySQL or MongoDB)?
> **Answer**: Centralized databases have single points of failure and rely entirely on administrator trust; a rogue database administrator or compromised server can alter grades, fabricate certificates, or wipe records without detection. Blockchain provides **decentralized immutability**: once a certificate transaction is mined into a block, cryptographic hashes and consensus rules ensure the record cannot be altered, forged, or backdated.

### Q2: What is the difference between a transaction (`.send()`) and a call (`.call()`)?
> **Answer**:
> - **`.send()`**: Used for state-modifying functions (e.g., `issueCertificate`, `revokeCertificate`). It creates a transaction, is signed by an account, gets mined into a block, modifies EVM state, and costs **Gas**.
> - **`.call()`**: Used for read-only functions (e.g., `verifyCertificate`). It queries the local node's current state, does not alter storage, executes immediately, and costs **0 Gas**.

### Q3: How is the Certificate ID generated and how does Keccak-256 prevent tampering?
> **Answer**: The certificate ID is a 256-bit hash generated on-chain using Solidity's `keccak256(abi.encodePacked(...))` function combining the recipient name, course, grade, issuer address, and timestamp. Due to the avalanche effect of cryptographic hashing, even a single character change in the inputs results in a completely different hash, making tampering immediately detectable.

### Q4: How does the smart contract handle expired certificates?
> **Answer**: When `verifyCertificate(certHash)` is called, the contract compares `block.timestamp` against the certificate's stored `expiryDate`. If `block.timestamp > cert.expiryDate`, the contract returns `status = "EXPIRED"` and `valid = false`.

### Q5: What role does Truffle and Ganache play in the development lifecycle?
> **Answer**: Ganache is a local personal Ethereum blockchain used to deploy contracts, develop applications, and run tests instantly with 10 pre-funded test accounts. Truffle is the development framework providing contract compilation (`solc`), automated migrations/deployment scripts, network management, and unit testing suites.
