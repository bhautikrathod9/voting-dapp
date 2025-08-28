import React from 'react';

const WalletConnect = ({ account, isConnected, isLoading, error, connectWallet, disconnectWallet }) => {
  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Wallet Connection</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!isConnected ? (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          {isLoading ? 'Connecting...' : 'Connect MetaMask Wallet'}
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 font-semibold">✅ Wallet Connected</p>
            <p className="text-gray-600">Address: {formatAddress(account)}</p>
          </div>
          <button
            onClick={disconnectWallet}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;