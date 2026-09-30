---
name: certverify-truffle-ganache
description: Configures Truffle and Ganache for the CertVerify DApp, creates migrations, compiles contracts, deploys them to the local development network, and diagnoses deployment problems.
---

# Truffle + Ganache Deployment Skill

## Environment
The target environment is a local Ethereum-compatible Ganache network.

Expected default RPC from the supplied project specification:
`http://localhost:7545`

Do not assume the port is correct if the user's Ganache instance reports another port; inspect the actual RPC endpoint and make configuration consistent.

## Project setup
Expected root:
```text
contracts/
migrations/
truffle-config.js
client/
```

Create:
```text
contracts/CertVerify.sol
migrations/2_certverify_migration.js
```

## Commands
Use the project's installed tooling. Typical commands:
```bash
truffle init
truffle compile
truffle migrate --network development
truffle console
```

For frontend:
```bash
cd client
npm init
npm install web3 lite-server jquery
npm start
```

## Truffle configuration
Configure the development network to match Ganache's RPC host and port.

Do not hardcode an account private key into source files.

## Deployment verification
After migration:
1. Capture the deployed contract address.
2. Confirm the deployment transaction succeeded.
3. Confirm the correct network ID.
4. Confirm the build artifact exists.
5. Ensure the frontend uses the same ABI and deployed address.

## Debugging
If deployment fails:
- verify Ganache is running
- verify RPC port
- run `truffle networks`
- compile again
- inspect migration error
- reset Ganache only when appropriate
- redeploy after a clean reset if addresses/artifacts are stale

Never report deployment success unless the command actually succeeds.
