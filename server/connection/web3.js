const Web3 = require('web3')

const provider = `http://127.0.0.1:8545`
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

module.exports = web3