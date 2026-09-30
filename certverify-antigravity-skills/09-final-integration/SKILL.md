---
name: certverify-final-integration
description: Performs the final build, smoke test, artifact consistency check, and submission readiness review for the CertVerify DApp.
---

# Final Integration Skill

## Before declaring complete
Inspect:
- `contracts/CertVerify.sol`
- migration files
- `truffle-config.js`
- `client/src/utils.js`
- `client/src/index.js`
- `client/index.html`
- CSS
- `client/contracts/CertVerify.json`

## Run
1. Start Ganache.
2. Compile contracts.
3. Migrate/deploy.
4. Confirm contract address.
5. Start client.
6. Connect Web3.
7. Issue a test certificate.
8. Verify it.
9. Revoke it.
10. Verify revoked status.
11. Test an expired certificate if supported by the implementation.
12. Test unauthorized access.
13. Test unknown certificate.
14. Check browser console for errors.
15. Check Ganache transactions.

## Artifact consistency
Confirm:
- ABI matches current contract.
- deployed address matches current network.
- frontend is not using an old artifact.
- no stale address remains after Ganache reset.

## Submission quality
Ensure:
- no unnecessary files
- no secrets/private keys
- clear README
- clean UI
- reproducible setup
- meaningful error messages
- no fake/mock blockchain results
- all requested project functions demonstrated

## Final report
Return:
- what was built
- files changed
- commands used
- contract address
- test cases passed
- any known limitations
- exact steps to run the project again
