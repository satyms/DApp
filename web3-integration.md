---
name: certverify-web3-integration
description: Connects the CertVerify frontend to the Ganache blockchain using Web3.js, loads the contract ABI/address, reads state, sends transactions, and handles accounts and receipts.
---

# Web3.js Integration Skill

## Goal
Implement the browser-to-blockchain bridge.

## Required files
```text
client/src/utils.js
client/src/index.js
client/contracts/CertVerify.json
```

## Provider
Use the actual Ganache RPC endpoint discovered from the running environment.

Typical local provider:
```javascript
const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(provider);
```

## Utilities
Implement:
- `getWeb3()`
- `getContract()`
- `getCurrentAccount()`

`getContract()` must use the ABI and the deployed contract address from the Truffle artifact/network data. Do not invent an address.

## Read operations
Use `.call()` for:
- certificate verification
- certificate retrieval
- issuer/account metadata where applicable

Example:
```javascript
contract.methods.verifyCertificate(hash).call()
```

## Write operations
Use `.send({ from: account })` for:
- issuing
- revoking

Example:
```javascript
contract.methods.issueCertificate(...).send({ from: account })
```

## Transaction UX
For every write transaction:
1. disable duplicate submission while pending
2. show a pending state
3. wait for confirmation
4. display transaction hash
5. display success/failure
6. refresh displayed blockchain state

## Error handling
Translate common errors into understandable messages:
- Ganache unavailable
- wrong network
- contract not found
- unauthorized issuer
- duplicate certificate
- invalid/expired certificate
- transaction rejected
- reverted transaction

Never hide the original error from development logs.

## Important
Do not create mock data that makes the application appear blockchain-connected. Every certificate result must come from the deployed contract.
