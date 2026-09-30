---
name: truffle-ganache-deployment
description: Configures Truffle framework, sets compilation settings, manages deployment migration scripts, and deploys contracts to a local Ganache network.
---

# Truffle & Ganache Deployment Skill

## Goal
Manage contract compilation, network configuration, and migration execution to the local Ethereum testnet.

## Truffle Configuration (`truffle-config.js`)
Ensure the following key settings:
```javascript
module.exports = {
  // Automatically write artifacts to client directory
  contracts_build_directory: "./client/src/contracts",

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,       // Default Ganache GUI port
      network_id: "*",  // Match any network id
    },
  },

  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
```

## Migration Scripts (`migrations/1_deploy_certverify.js`)
```javascript
const CertVerify = artifacts.require("CertVerify");

module.exports = function (deployer) {
  deployer.deploy(CertVerify);
};
```

## Deployment Commands
```bash
# 1. Compile contracts
truffle compile

# 2. Deploy to Ganache
truffle migrate --network development

# 3. Force re-deploy if contract code changes
truffle migrate --network development --reset
```

## Troubleshooting Matrix
- **`Port 7545 closed`**: Ganache GUI is not running or quickstart workspace is closed. Start Ganache and confirm port 7545.
- **`Compiler mismatch`**: Ensure `solc.version` in `truffle-config.js` matches the `pragma solidity` declaration in `.sol` files.
- **`Contract artifact missing`**: Verify `contracts_build_directory` path exists or re-run `truffle compile`.
