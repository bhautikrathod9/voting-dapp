import { useState, useEffect, useCallback } from 'react';
import { getContract, getContractWithSigner } from '../utils/contract';

export const useVoting = (provider, signer, account) => {
  const [candidates, setCandidates] = useState([]);
  const [voterInfo, setVoterInfo] = useState({
    isRegistered: false,
    hasVoted: false,
    votedCandidateId: 0
  });
  const [totalVotes, setTotalVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [admin, setAdmin] = useState('');

  // Fetch candidates
  const fetchCandidates = useCallback(async () => {
    if (!provider) return;

    try {
      setIsLoading(true);
      const contract = getContract(provider);
      const allCandidates = await contract.getAllCandidates();
      
      const formattedCandidates = allCandidates.map(candidate => ({
        id: Number(candidate.id),
        name: candidate.name,
        voteCount: Number(candidate.voteCount)
      }));

      setCandidates(formattedCandidates);
    } catch (error) {
      setError(`Failed to fetch candidates: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [provider]);

  // Fetch voter info
  const fetchVoterInfo = useCallback(async () => {
    if (!provider || !account) return;

    try {
      const contract = getContract(provider);
      const info = await contract.getVoterInfo(account);
      
      setVoterInfo({
        isRegistered: info[0],
        hasVoted: info[1],
        votedCandidateId: Number(info[2])
      });
    } catch (error) {
      console.error('Failed to fetch voter info:', error);
    }
  }, [provider, account]);

  // Fetch total votes
  const fetchTotalVotes = useCallback(async () => {
    if (!provider) return;

    try {
      const contract = getContract(provider);
      const total = await contract.totalVotes();
      setTotalVotes(Number(total));
    } catch (error) {
      console.error('Failed to fetch total votes:', error);
    }
  }, [provider]);

  // Fetch admin
  const fetchAdmin = useCallback(async () => {
    if (!provider) return;

    try {
      const contract = getContract(provider);
      const adminAddress = await contract.admin();
      setAdmin(adminAddress);
    } catch (error) {
      console.error('Failed to fetch admin:', error);
    }
  }, [provider]);

  // Vote for candidate
  const vote = async (candidateId) => {
    if (!signer) throw new Error('Wallet not connected');
    
    try {
      setIsLoading(true);
      setError('');
      
      const contract = getContractWithSigner(signer);
      const tx = await contract.vote(candidateId);
      await tx.wait();
      
      // Refresh data
      await Promise.all([
        fetchCandidates(),
        fetchVoterInfo(),
        fetchTotalVotes()
      ]);
      
      return tx;
    } catch (error) {
      setError(`Failed to vote: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Add candidate (admin only)
  const addCandidate = async (name) => {
    if (!signer) throw new Error('Wallet not connected');
    
    try {
      setIsLoading(true);
      setError('');
      
      const contract = getContractWithSigner(signer);
      const tx = await contract.addCandidate(name);
      await tx.wait();
      
      await fetchCandidates();
      return tx;
    } catch (error) {
      setError(`Failed to add candidate: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register voter (admin only)
  const registerVoter = async (voterAddress) => {
    if (!signer) throw new Error('Wallet not connected');
    
    try {
      setIsLoading(true);
      setError('');
      
      const contract = getContractWithSigner(signer);
      const tx = await contract.registerVoter(voterAddress);
      await tx.wait();
      
      if (voterAddress.toLowerCase() === account.toLowerCase()) {
        await fetchVoterInfo();
      }
      
      return tx;
    } catch (error) {
      setError(`Failed to register voter: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh all data
  const refreshData = async () => {
    await Promise.all([
      fetchCandidates(),
      fetchVoterInfo(),
      fetchTotalVotes(),
      fetchAdmin()
    ]);
  };

  // Initial data fetch
  useEffect(() => {
    if (provider) {
      refreshData();
    }
  }, [provider, account]);

  return {
    candidates,
    voterInfo,
    totalVotes,
    admin,
    isLoading,
    error,
    vote,
    addCandidate,
    registerVoter,
    refreshData
  };
};