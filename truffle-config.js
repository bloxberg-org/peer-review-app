const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = process.env.MNEMONIC;

// Provider engine instantiation can be included but is not necessary when account is unlocked
module.exports = {
  networks: {
    develop: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    bloxberg: {
      provider: () =>
        new HDWalletProvider(mnemonic, 'https://core.bloxberg.org'),
      network_id: '8995',
      gas: 8000000,   // <--- Twice as much
      gasPrice: 4 * 1000000000, // X * gwei's
      from: '0xAA6042aa65eb93C6439cDaeBC27B3bd09c5DFe94'
    },
    bloxbergDev: {
      provider: () =>
        new HDWalletProvider(mnemonic, 'https://bloxberg.org/eth/'),
      network_id: '8995',
      from: '0xAA6042aa65eb93C6439cDaeBC27B3bd09c5DFe94'
    }
  },
  compilers: {
    solc: {
      version: '^0.5.0',
      settings: {
        evmVersion: 'byzantium' // Default: "petersburg"
      }
    }
  }
}