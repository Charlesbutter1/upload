import React from 'react';
import { createWalletClient, custom, http } from 'viem';
import { syscoin } from 'viem/chains';
import { useState, useEffect } from 'react';
import App from '../App';

const walletClient = createWalletClient({
  chain: syscoin,
  transport: custom(window.ethereum)
});




const COnnect = () => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      // Check if MetaMask is installed  
      if (window.ethereum && window.ethereum.isMetaMask) {
    
        
        const walletClient = createWalletClient({
          chain: syscoin,  
          transport: custom(window.ethereum),  
        });

         const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });

        if (accounts.length > 0) {
          // Get the connected address
          const [address] = accounts;
          setAddress(address);
        }
      } else {
        console.log('MetaMask is not installed.');
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    try {

      if (window.ethereum && window.ethereum.isMetaMask) {

        const walletClient = createWalletClient({
          chain: syscoin,  
          transport: custom(window.ethereum),  
        });

        // Connect to MetaMask wallet
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        // Get the addresses from the wallet client
        const [address] = await walletClient.getAddresses();

        setAddress(address);
      } else {
        console.log('MetaMask is not installed.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const formatAddress = (address) => {
    if (address) {
      const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
      return shortAddress;
    }
    return '';
  };

  return (
    <div>
      {address ? (
        <p>Connected Address: {formatAddress(address)}</p>
      ) : (
        <div>
          <p>Connected Address: {formatAddress(address)}.</p>
          <button className='button' onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default COnnect;