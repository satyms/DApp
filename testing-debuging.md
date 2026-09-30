---
name: certverify-testing-debugging
description: Tests the CertVerify smart contract and frontend end-to-end, diagnoses Ganache, Truffle, Web3.js, transaction, authorization, expiry, and contract-address problems.
---

# Testing & Debugging Skill

## Contract test matrix

### Happy paths
1. Authorized issuer issues a certificate.
2. Issued certificate can be retrieved.
3. Issued certificate verifies as valid before expiry.
4. Authorized issuer revokes a certificate.
5. Revoked certificate verifies as revoked.
6. Expired certificate verifies as expired.

### Negative paths
1. Duplicate certificate issuance is rejected.
2. Unauthorized issuance is rejected.
3. Unauthorized revocation is rejected.
4. Unknown certificate is reported as not found.
5. Invalid required input is rejected.
6. Frontend cannot connect when Ganache is stopped.
7. Frontend reports contract/network mismatch.

## Blockchain checks
For every successful write:
- transaction hash exists
- receipt exists
- block number exists
- Ganache shows the transaction
- state changes are visible through a subsequent `.call()`

## Debugging workflow
When something fails:
1. Read the exact error.
2. Determine whether it is frontend, Web3, RPC, Truffle, migration, or Solidity.
3. Check browser console.
4. Check Ganache logs/transactions.
5. Check contract address and network ID.
6. Check ABI artifact.
7. Check sender account.
8. Check `require()` conditions.
9. Reproduce the issue in `truffle console` where possible.
10. Fix the smallest root cause.
11. Re-run the affected test and the complete smoke test.

## Common issues
- No RPC connection -> start Ganache and verify port.
- Contract not found -> redeploy and update artifact/address.
- Not authorized -> verify `msg.sender`.
- Transaction reverted -> inspect contract `require()` conditions.
- Hash not found -> verify exact hash/ID formatting.
- Frontend reads stale state -> re-query after receipt.

Never declare the project complete until the end-to-end smoke test passes.
