import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useWallet = () => {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if wallet is already connected
  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          setAccount(accounts[0].address);
          setProvider(provider);
          setSigner(await provider.getSigner());
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask!');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Check if on correct network (Hardhat local network)
      const network = await provider.getNetwork();
      if (network.chainId !== 1337n && network.chainId !== 31337n) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x539' }], // 1337 in hex
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            // Network not added to MetaMask
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x539',
                chainName: 'Hardhat Local',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['http://127.0.0.1:8545'],
                blockExplorerUrls: null,
              }],
            });
          }
        }
      }

      setAccount(address);
      setProvider(provider);
      setSigner(signer);
      setIsConnected(true);
    } catch (error) {
      setError(`Failed to connect wallet: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setProvider(null);
    setSigner(null);
    setIsConnected(false);
    setError('');
  };

  return {
    account,
    provider,
    signer,
    isConnected,
    isLoading,
    error,
    connectWallet,
    disconnectWallet
  };
};