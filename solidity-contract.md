---
name: certverify-solidity-contract
description: Designs, implements, and reviews the CertVerify Solidity smart contract with secure access control, certificate storage, verification, expiry, revocation, hashing, and events.
---

# Solidity Contract Skill

## Goal
Implement `contracts/CertVerify.sol` for a local Ethereum-compatible Ganache network.

## Required data model
Use a `Certificate` struct containing at minimum:
- certificate ID or hash
- student name
- course
- grade
- issue timestamp
- expiry timestamp
- issuer
- active/revoked status

Use a mapping keyed by a deterministic certificate hash or ID.

## Required functions
Implement:
- `issueCertificate(...)`
- `verifyCertificate(...)`
- `getCertificate(...)`
- `revokeCertificate(...)`

Use sensible return values and avoid unnecessary storage duplication.

## Required Solidity concepts
Demonstrate:
- `msg.sender`
- `block.timestamp`
- `require`
- modifier for issuer authorization
- constructor
- structs
- mappings
- events
- state variables
- `keccak256`

## Access control
The contract must establish an issuer/admin address in the constructor.

Only the authorized issuer can:
- issue certificates
- revoke certificates

Verification and retrieval should be publicly readable.

## Validation
Reject:
- empty certificate identifiers
- duplicate certificates
- invalid expiry where appropriate
- unauthorized issue/revoke attempts
- invalid certificate hashes

Verification should distinguish:
- certificate not found
- certificate revoked
- certificate expired
- certificate valid

## Events
Emit events for:
- certificate issued
- certificate revoked

Include enough indexed data to make transaction logs useful during the demo.

## Security rules
- Prefer checks-effects-interactions ordering.
- Do not use unnecessary Ether transfers.
- Avoid unbounded loops.
- Do not store data that can be derived cheaply unless needed for the UI.
- Do not expose private keys or secrets.
- Use clear visibility on all state variables and functions.
- Keep compiler version explicit and compatible with the installed Truffle toolchain.

## Output
After implementation, compile the contract and resolve all compiler errors before moving to frontend work.
