import Web3 from 'web3';

const getWeb3 = () => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  // window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    throw new Error('No web3 found');
  }
  // });
};

export default getWeb3; 