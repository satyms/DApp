---
name: certverify-security-review
description: Reviews the CertVerify DApp for smart-contract access control, validation, transaction safety, data integrity, and frontend security before final submission.
---

# Security Review Skill

## Review the Solidity contract
Check:
- issuer access control
- duplicate prevention
- input validation
- correct use of `msg.sender`
- correct timestamp logic
- safe state transitions
- no accidental Ether custody
- no unnecessary loops
- explicit visibility
- meaningful events
- no private key or secret in source

## Review certificate integrity
The verification result must be derived from on-chain state.

Do not trust:
- frontend-only flags
- localStorage as the source of truth
- editable client-side JSON
- hardcoded "valid" responses

## Review frontend
Check:
- no private keys
- no seed phrases
- no secrets
- no unsafe HTML insertion of untrusted certificate fields
- input validation
- useful transaction error messages
- correct contract/network pairing

## Threat cases
Test:
- non-issuer attempts issue
- non-issuer attempts revoke
- duplicate certificate
- expired certificate
- revoked certificate
- unknown certificate
- Ganache reset with stale frontend artifact/address

## Final rule
This is an educational local DApp, not a production certificate authority. Do not claim production-grade security or decentralized governance unless those features actually exist.
