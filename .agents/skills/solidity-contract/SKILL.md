---
name: solidity-contract
description: Designs, implements, and audits the CertVerify Solidity smart contract with secure access control, certificate storage, verification, expiry, revocation, hashing, and events.
---

# Solidity Smart Contract Skill

## Goal
Implement and maintain `contracts/CertVerify.sol` for EVM execution on local Ganache.

## Required Data Model
```solidity
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
```

## State Storage
- `owner`: Contract deployer (`address public owner`).
- `issuers`: Authorized issuer mapping (`mapping(address => bool) public issuers`).
- `certificates`: Primary registry (`mapping(bytes32 => Certificate) private certificates`).

## Required Functions
1. `issueCertificate(string _recipientName, string _courseName, string _grade, uint256 _expiryDate) public onlyIssuer returns (bytes32)`
   - Validates inputs (`require(bytes(_recipientName).length > 0)`, `require(_expiryDate > block.timestamp)`).
   - Generates deterministic `keccak256` hash from fields + `msg.sender` + `block.timestamp`.
   - Stores `Certificate` in `certificates` mapping.
   - Emits `CertificateIssued` event and returns `bytes32` hash.
2. `verifyCertificate(bytes32 _certHash) public view returns (bool valid, string memory status, Certificate memory cert)`
   - Read-only call returning status: `VALID`, `REVOKED`, `EXPIRED`, or `NOT_FOUND`.
3. `getCertificate(bytes32 _certHash) public view returns (Certificate memory)`
   - Retrieves full certificate record.
4. `revokeCertificate(bytes32 _certHash) public onlyIssuer`
   - Sets `isActive = false` and emits `CertificateRevoked`.
5. `addIssuer(address _issuer) public onlyOwner` / `removeIssuer(address _issuer) public onlyOwner`

## Security & Best Practices
- Strict Checks-Effects-Interactions pattern.
- Explicit function and variable visibilities.
- Proper modifier guardrails (`onlyOwner`, `onlyIssuer`).
- Zero unnecessary ether transfers or loops.
