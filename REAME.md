# 🗳️ Blockchain Voting DApp

A decentralized voting application built with Solidity smart contracts and React frontend. This DApp enables secure, transparent, and tamper-proof voting using Ethereum blockchain technology.

## 🚀 Features

- **Smart Contract Backend**: Solidity-based voting contract with admin controls
- **React Frontend**: Modern UI built with Vite + React + TailwindCSS
- **MetaMask Integration**: Seamless wallet connection and transaction handling
- **Admin Panel**: Add candidates and register voters
- **Real-time Results**: Live vote counting and results display
- **Security**: Prevents double voting and ensures voter registration
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technology Stack

### Backend
- **Solidity ^0.8.19** - Smart contract development
- **Hardhat** - Ethereum development framework
- **ethers.js** - Ethereum library for blockchain interaction

### Frontend
- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **ethers.js v6** - Web3 integration

## 📋 Prerequisites

- **Node.js** (v16 or later)
- **MetaMask** browser extension
- **Git** for version control

## 🏃‍♂️ Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd blockchain-voting-dapp
```

### 2. Smart Contract Setup
```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Start local blockchain
npx hardhat node

# Deploy contract (in new terminal)
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd voting-frontend

# Install dependencies
npm install

# Update contract address in src/utils/contract.js
# Copy the deployed contract address from step 2

# Start development server
npm run dev
```

### 4. MetaMask Configuration
- **Network Name**: Hardhat Local
- **RPC URL**: http://127.0.0.1:8545
- **Chain ID**: 1337
- **Currency**: ETH

## 🎯 Usage Guide

### For Administrators
1. **Connect Wallet** - Connect the deployer account (admin)
2. **Add Candidates** - Use admin panel to add voting candidates
3. **Register Voters** - Add voter addresses to enable voting
4. **Monitor Results** - View real-time voting statistics

### For Voters
1. **Connect Wallet** - Connect your MetaMask wallet
2. **Check Registration** - Ensure you're registered by admin
3. **Cast Vote** - Click vote button on your preferred candidate
4. **View Results** - See live voting results and statistics

## 📁 Project Structure

```
blockchain-voting-dapp/
├── contracts/
│   └── Voting.sol              # Main voting smart contract
├── scripts/
│   └── deploy.js               # Contract deployment script
├── test/
│   └── Voting.js               # Smart contract tests
├── voting-frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Utility functions
│   │   └── App.jsx             # Main app component
│   └── package.json
├── hardhat.config.js           # Hardhat configuration
└── package.json
```

## 🔧 Key Components

### Smart Contract Features
- **Candidate Management**: Admin can add candidates
- **Voter Registration**: Admin controls voter eligibility
- **Vote Casting**: One vote per registered voter
- **Results Tracking**: Real-time vote counting
- **Event Logging**: Transparent activity logging

### Frontend Components
- **WalletConnect**: MetaMask integration component
- **AdminPanel**: Admin-only controls for setup
- **CandidateCard**: Individual candidate voting interface
- **VotingResults**: Live results and statistics display

## 🧪 Testing

### Smart Contract Tests
```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/Voting.js
```

### Frontend Testing
```bash
cd voting-frontend
npm run build    # Test production build
npm run preview  # Preview production build
```

## 🔐 Security Features

- **Access Control**: Only admin can add candidates and register voters
- **Vote Validation**: Prevents double voting and invalid votes
- **Address Verification**: Validates Ethereum addresses
- **Transaction Security**: All actions require wallet signatures

## 🌐 Network Configuration

### Local Development
- **Chain ID**: 1337
- **RPC**: http://127.0.0.1:8545
- **Gas Price**: 8 gwei
- **Block Time**: ~2 seconds

### Supported Networks
- Hardhat Local Network (default)
- Ganache (configuration required)
- Testnet deployment ready (Sepolia, Goerli)

## 🚨 Troubleshooting

### Common Issues

**Contract Address Error**
```bash
# Ensure contract is deployed and address is updated
npx hardhat run scripts/deploy.js --network localhost
```

**MetaMask Connection Issues**
- Reset MetaMask account activity
- Check network configuration
- Ensure sufficient ETH for gas fees

**ENS Resolution Error**
- Use valid Ethereum addresses (0x...)
- Avoid ENS names on local network

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open Pull Request

## 🙏 Acknowledgments

- **Hardhat** team for excellent development tools
- **OpenZeppelin** for smart contract security standards
- **ethers.js** for seamless blockchain integration
- **React** and **TailwindCSS** communities

**Built with ❤️ using Solidity, React, and Web3 technologies**