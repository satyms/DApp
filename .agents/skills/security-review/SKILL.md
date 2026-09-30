---
name: security-review
description: Security review, access control verification, re-entrancy prevention, and integrity audit checklist for CertVerify smart contracts and Web3 frontend.
---

# Security Review Skill

## Goal
Audit the smart contract and frontend code for security vulnerabilities, unauthorized privilege escalation, and data integrity flaws.

## Security Checklist

### 1. Access Control
- [x] **Owner Protection**: `onlyOwner` restricts issuer additions and removals.
- [x] **Issuer Protection**: `onlyIssuer` prevents unauthorized callers from calling `issueCertificate()` or `revokeCertificate()`.
- [x] **Public Reads**: `verifyCertificate()` and `getCertificate()` are explicitly marked `view` and do not alter state.

### 2. Input Validation
- [x] **String Length Checks**: Validates that recipient name and course name are not empty.
- [x] **Expiration Validation**: Validates `_expiryDate > block.timestamp` during issuance so expired credentials cannot be minted.
- [x] **Zero Address Guard**: Validates `_issuer != address(0)` when authorizing new issuers.

### 3. Collision & Hashing Security
- [x] **Deterministic Keccak256**: Hashes include `_recipientName`, `_courseName`, `_grade`, `msg.sender`, and `block.timestamp`.
- [x] **Duplicate Prevention**: Reverts if a certificate with the same hash already exists (`certificates[certHash].issuedDate == 0`).

### 4. Denial of Service (DoS) & Gas Limits
- [x] **No Unbounded Loops**: Certificate storage uses O(1) hash mappings instead of iterating dynamic arrays.
- [x] **Checks-Effects-Interactions**: State modifications occur before event emissions.
- [x] **Zero Ether Vulnerabilities**: No ether is accepted or forwarded; contract does not hold ether balance, mitigating re-entrancy and drain risks.

### 5. Frontend & RPC Security
- [x] **Input Sanitization**: Verifies that certificate hash string format matches 32-byte hexadecimal representation (`0x` + 64 characters) before triggering RPC calls.
- [x] **Safe Error Handling**: Prevents application crashes on reverted transactions.
