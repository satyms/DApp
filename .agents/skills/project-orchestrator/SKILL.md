---
name: project-orchestrator
description: Coordinates the complete build of the CertVerify Decentralized Certificate Verification DApp using Solidity, Truffle, Ganache, Web3.js, HTML5, CSS3, and JavaScript. Use when starting, orchestrating, or reviewing the overall project workflow.
---

# Project Orchestrator Skill

## Objective
Coordinate the complete creation, deployment, integration, and verification of the CertVerify DApp. Ensure that each phase executes sequentially without skipping validation, and enforce real blockchain execution rather than mock or simulated state.

## Core Stack & Environments
- **Smart Contracts**: Solidity (^0.8.19)
- **Framework**: Truffle Suite
- **Blockchain**: Ganache (Port 7545)
- **Frontend Bridge**: Web3.js (v1.x)
- **Web Interface**: HTML5, CSS3, JavaScript (ES modules)
- **Dev Server**: Lite-server

## Orchestration Sequence
1. **Scaffolding & Setup**: Initialize Truffle project and ensure workspace directory layout (`contracts/`, `migrations/`, `test/`, `client/`).
2. **Contract Development**: Write `CertVerify.sol` adhering strictly to access control (`onlyIssuer`), struct data models, and event logging.
3. **Compilation**: Run `truffle compile` and confirm output artifacts are generated in `client/src/contracts/CertVerify.json`.
4. **Local Network & Deployment**: Connect to Ganache on port 7545 and run `truffle migrate --network development`.
5. **Web3.js Integration**: Connect frontend to Ganache RPC and bind contract instance using network ID and compiled ABI.
6. **Frontend UI Implementation**: Implement Issue, Verify, and Revoke panels with clear response feedback and transaction links.
7. **Testing & Security Audit**: Validate state updates on-chain, test edge cases (expired, revoked, invalid inputs), and ensure only authorized accounts can mutate state.
8. **Documentation & Viva Prep**: Prepare project walkthrough, viva talking points, and technical documentation.

## Non-Negotiable Rules
- Never fake blockchain results in the frontend.
- State-altering operations must execute via `.send({ from: account })`.
- Read operations must execute via `.call()` (costing 0 gas).
- Keep compiler versions aligned across contracts and `truffle-config.js`.
