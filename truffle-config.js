const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config(); // Load env variables.

const mnemonic = process.env.MNEMONIC;
// Declare providers here to use getAddress() below. As every developer can use a different mnemonic the from field should be dynamic.
let bloxbergProvider = new HDWalletProvider(mnemonic, 'https://core.bloxberg.org');
let bloxbergDevProvider = new HDWalletProvider(mnemonic, 'https://bloxberg.org/eth/');
let rinkebyProvider = new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/6491efd5b28f48a183d8ab3131fa4012');

module.exports = {
  networks: {
    develop: {
      host: "localhost",
      port: 8545,
      network_id: "5777" // Match any network id
    },
    bloxberg: {
      provider: bloxbergProvider,
      network_id: '8995',
      gas: 8000000,   // <--- Twice as much
      gasPrice: 4 * 1000000000, // X * gwei's
      from: bloxbergProvider.getAddress(0) // Use the first address managed.
    },
    bloxbergDev: {
      provider: () => bloxbergDevProvider,
      network_id: '8995',
      from: bloxbergDevProvider.getAddress(0)
    },
    rinkeby: {
      provider: () => rinkebyProvider,
      network_id: '4',
      from: rinkebyProvider.getAddress(0),
      gas: 3000000,
      gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      version: '^0.5.0',
      settings: {
        //evmVersion: 'byzantium' // Default: "petersburg"
      }
    }
  },
  contracts_build_directory: './client/src/contracts' // React can't access files outside src/
}
