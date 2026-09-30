---
name: web3-integration
description: Establishes Web3.js communication between the browser frontend and local Ganache Ethereum blockchain, handling contract instances, RPC calls, account resolution, and transaction signing.
---

# Web3 Integration Skill

## Goal
Implement client-side Web3.js utilities to bridge browser user interactions with on-chain smart contracts.

## Web3 Provider Setup
Connect directly to the local Ganache RPC endpoint:
```javascript
const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(provider);
```

## Dynamic Contract Binding (`client/src/utils.js`)
Instead of hardcoding contract addresses, dynamically resolve the address using the current network ID:
```javascript
export async function getContract(web3) {
  const response = await fetch("./src/contracts/CertVerify.json");
  const artifact = await response.json();
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = artifact.networks[networkId];

  if (!deployedNetwork || !deployedNetwork.address) {
    throw new Error(`Contract not deployed on network ${networkId}`);
  }

  return {
    contract: new web3.eth.Contract(artifact.abi, deployedNetwork.address),
    address: deployedNetwork.address
  };
}
```

## Account Management
Retrieve the unlocked Ganache accounts:
```javascript
export async function getCurrentAccount(web3) {
  const accounts = await web3.eth.getAccounts();
  if (!accounts || accounts.length === 0) {
    throw new Error("No Ganache accounts found. Ensure Ganache is running.");
  }
  return accounts[0]; // First account is the deployer / authorized issuer
}
```

## Execution Paradigms
- **State Reads (`.call()`)**:
  ```javascript
  const result = await contract.methods.verifyCertificate(certHash).call();
  ```
  - Free (0 gas).
  - Synchronous query against local node.
- **State Writes (`.send()`)**:
  ```javascript
  const receipt = await contract.methods
    .issueCertificate(name, course, grade, expiryTs)
    .send({ from: currentAccount, gas: 300000 });
  ```
  - Costs gas and generates a mined transaction receipt.
  - Listen to `receipt.events` to extract emitted hashes and logs.
