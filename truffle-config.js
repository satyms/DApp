module.exports = {
  // Automatically outputs compiled contract JSON into the React/frontend folder
  contracts_build_directory: "./client/src/contracts",

  networks: {
    development: {
      host: "127.0.0.1",   // Ganache local host
      port: 7545,          // Ganache GUI default port
      network_id: "*",     // Match any Ganache network ID
    },
  },

  compilers: {
    solc: {
      version: "0.8.19",   // Match pragma in CertVerify.sol
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },
  },
};
