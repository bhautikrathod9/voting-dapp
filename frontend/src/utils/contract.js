import { ethers } from 'ethers';

// Replace with your deployed contract address
export const VOTING_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Voting Contract ABI
export const VOTING_ABI = [
  "constructor()",
  "function admin() view returns (address)",
  "function candidates(uint256) view returns (uint256 id, string name, uint256 voteCount)",
  "function candidatesCount() view returns (uint256)",
  "function totalVotes() view returns (uint256)",
  "function voters(address) view returns (bool isRegistered, bool hasVoted, uint256 votedCandidateId)",
  "function addCandidate(string _name)",
  "function registerVoter(address _voter)",
  "function vote(uint256 _candidateId)",
  "function getCandidate(uint256 _candidateId) view returns (uint256, string, uint256)",
  "function getAllCandidates() view returns (tuple(uint256 id, string name, uint256 voteCount)[])",
  "function getVoterInfo(address _voter) view returns (bool, bool, uint256)",
  "event CandidateAdded(uint256 indexed candidateId, string name)",
  "event VoterRegistered(address indexed voter)",
  "event VoteCasted(address indexed voter, uint256 indexed candidateId)"
];

// Helper function to get contract instance
export const getContract = (provider) => {
  return new ethers.Contract(VOTING_CONTRACT_ADDRESS, VOTING_ABI, provider);
};

// Helper function to get contract with signer
export const getContractWithSigner = (signer) => {
  return new ethers.Contract(VOTING_CONTRACT_ADDRESS, VOTING_ABI, signer);
};