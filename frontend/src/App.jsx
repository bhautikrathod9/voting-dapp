import React from 'react';
import { useWallet } from './hooks/useWallet';
import { useVoting } from './hooks/useVoting';
import WalletConnect from './components/WalletConnect';
import CandidateCard from './components/CandidateCard';
import VotingResults from './components/VotingResults';
import AdminPanel from './components/AdminPanel';


function App() {
  const {
    account,
    provider,
    signer,
    isConnected,
    isLoading: walletLoading,
    error: walletError,
    connectWallet,
    disconnectWallet
  } = useWallet();

  const {
    candidates,
    voterInfo,
    totalVotes,
    admin,
    isLoading: votingLoading,
    error: votingError,
    vote,
    addCandidate,
    registerVoter,
    refreshData
  } = useVoting(provider, signer, account);

  const isAdmin = account && admin && account.toLowerCase() === admin.toLowerCase();
  const isLoading = walletLoading || votingLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🗳️ Blockchain Voting DApp</h1>
          <p className="text-gray-600">Secure, transparent, and decentralized voting system</p>
        </div>

        {/* Wallet Connection */}
        <WalletConnect
          account={account}
          isConnected={isConnected}
          isLoading={walletLoading}
          error={walletError}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
        />

        {isConnected && (
          <>
            {/* Admin Panel */}
            <AdminPanel
              isAdmin={isAdmin}
              onAddCandidate={addCandidate}
              onRegisterVoter={registerVoter}
              isLoading={isLoading}
            />

            {/* Voter Status */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Your Voting Status</h2>
              <div className="flex flex-wrap gap-4">
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  voterInfo.isRegistered ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {voterInfo.isRegistered ? '✅ Registered Voter' : '❌ Not Registered'}
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  voterInfo.hasVoted ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {voterInfo.hasVoted ? '✅ Vote Cast' : '⏳ Haven\'t Voted'}
                </div>
                {isAdmin && (
                  <div className="px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                    🔐 Admin
                  </div>
                )}
              </div>
            </div>

            {/* Error Display */}
            {votingError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
                {votingError}
              </div>
            )}

            {/* Candidates Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Candidates</h2>
              {candidates.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-lg">No candidates available yet.</p>
                  {isAdmin && <p className="text-sm text-gray-500 mt-2">Use the Admin Panel above to add candidates.</p>}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {candidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      onVote={vote}
                      canVote={voterInfo.isRegistered}
                      hasVoted={voterInfo.hasVoted}
                      votedFor={voterInfo.votedCandidateId}
                      isLoading={isLoading}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Results */}
            {candidates.length > 0 && (
              <VotingResults
                candidates={candidates}
                totalVotes={totalVotes}
                onRefresh={refreshData}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;