---
name: certverify-project-orchestrator
description: Orchestrates the complete Certificate Verification DApp build using Solidity, Truffle, Ganache, Web3.js, HTML, CSS, and JavaScript. Use when starting the project, coordinating all implementation stages, or recovering from a partial build.
---

# Certificate Verification DApp — Project Orchestrator

## Objective
Build a working local blockchain DApp named CertVerify for a college mini-project. The application must issue, verify, retrieve, and revoke certificates through a Solidity smart contract deployed with Truffle to Ganache and accessed from a Web3.js frontend.

## Source requirements
Follow the supplied project skills specification:
- Certificate struct
- Mapping keyed by certificate hash
- Issuer address
- `issueCertificate()`
- `verifyCertificate()`
- `getCertificate()`
- `revokeCertificate()`
- `keccak256`
- `require`
- events
- expiry/active-status logic
- Truffle compilation/deployment
- Ganache local network
- Web3.js provider, contract instance, `.call()`, `.send()`
- HTML/CSS/JavaScript frontend
- manual testing and transaction verification

## Execution order
1. Inspect the workspace before changing anything.
2. Create a clean Truffle project structure if one does not exist.
3. Implement the Solidity contract.
4. Compile and fix compiler errors.
5. Configure and start/use Ganache.
6. Deploy with the development network.
7. Confirm the deployed contract address and artifact.
8. Implement Web3.js utilities.
9. Implement the frontend issue/verify/revoke flows.
10. Add validation and readable transaction/error states.
11. Test every contract function and important failure path.
12. Run the complete application end-to-end.
13. Produce a concise README with setup, commands, architecture, testing, and viva points.

## Non-negotiable behavior
- Never fake blockchain results in the UI.
- Read certificate state from the deployed contract.
- State-changing operations must use `.send()`.
- Read-only operations must use `.call()`.
- Issuance and revocation must enforce issuer authorization.
- Expired or revoked certificates must not be reported as valid.
- Preserve the existing project if it is already partially implemented; modify only what is necessary.

## Final acceptance checklist
- Ganache running.
- Contract compiles.
- Contract deploys successfully.
- Frontend connects to the correct RPC.
- Issue works.
- Verify works.
- Get/retrieve works.
- Revoke works.
- Expiry handling works.
- Unauthorized actions fail.
- Transaction receipts are visible.
- No hardcoded fake verification results.
