import { ethers } from 'ethers';

export const MetaMaskService = {
  initialize: async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      return signer;
    } else {
      throw new Error('MetaMask extension not installed');
    }
  },

  getWalletAddress: async () => {
    try {
      const signer = await MetaMaskService.initialize();
      const address = await signer.getAddress();
      return address;
    } catch (error) {
      throw new Error('Failed to get MetaMask wallet address');
    }
  },

  signMessage: async (message) => {
    try {
      const signer = await MetaMaskService.initialize();
      const signature = await signer.signMessage(message);
      return signature;
    } catch (error) {
      throw new Error('Failed to sign message with MetaMask');
    }
  },

  authenticate: async (walletAddress, signature) => {
    try {
      const response = await fetch('test.api/auth/metamask/sign-in', {
        method: 'POST',
        body: JSON.stringify({ walletAddress, signature }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to authenticate via MetaMask');
      }
    } catch (error) {
      throw new Error('Failed to authenticate via MetaMask');
    }
  },

  register: async (walletAddress, signature, username) => {
    try {
      const response = await fetch('test.api/auth/metamask/sign-up', {
        method: 'POST',
        body: JSON.stringify({ walletAddress, signature, username }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to register via MetaMask');
      }
    } catch (error) {
      throw new Error('Failed to register via MetaMask');
    }
  },

  loginWithMetaMask: async () => {
    try {
      const walletAddress = await MetaMaskService.getWalletAddress();

      const nonceResponse = await fetch(
        `test.api/eth/nonce?walletAddress=${walletAddress}`
      );
      const { nonce } = await nonceResponse.json();

      const message = `Sign-in to TEST_APP ${nonce}`;
      const signature = await MetaMaskService.signMessage(message);

      await MetaMaskService.authenticate(walletAddress, signature);
    } catch (error) {
      throw error;
    }
  },

  signupWithMetaMask: async (username) => {
    try {
      const walletAddress = await MetaMaskService.getWalletAddress();

      const nonceResponse = await fetch(
        `test.api/eth/nonce?walletAddress=${walletAddress}`
      );
      const { nonce } = await nonceResponse.json();

      const message = `Sign-up to TEST_APP ${nonce}`;
      const signature = await MetaMaskService.signMessage(message);

      await MetaMaskService.register(walletAddress, signature, username);
    } catch (error) {
      throw error;
    }
  },
};
