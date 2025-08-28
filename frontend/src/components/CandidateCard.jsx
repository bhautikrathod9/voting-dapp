import React, { useState } from 'react';

const CandidateCard = ({ candidate, onVote, canVote, hasVoted, votedFor, isLoading }) => {
  const [voting, setVoting] = useState(false);

  const handleVote = async () => {
    try {
      setVoting(true);
      await onVote(candidate.id);
    } catch (error) {
      console.error('Vote failed:', error);
    } finally {
      setVoting(false);
    }
  };

  const isVotedFor = hasVoted && votedFor === candidate.id;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all duration-200 ${
      isVotedFor ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-blue-300'
    }`}>
      <div className="text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 ${
          isVotedFor ? 'bg-green-500' : 'bg-blue-500'
        }`}>
          {candidate.name.charAt(0)}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{candidate.name}</h3>
        
        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          <p className="text-2xl font-bold text-blue-600">{candidate.voteCount}</p>
          <p className="text-sm text-gray-600">votes</p>
        </div>
        
        {isVotedFor && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
            ✅ You voted for this candidate
          </div>
        )}
        
        <button
          onClick={handleVote}
          disabled={!canVote || hasVoted || voting || isLoading}
          className={`w-full font-bold py-3 px-4 rounded-lg transition duration-200 ${
            hasVoted 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : canVote
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {voting ? 'Voting...' : hasVoted ? 'Already Voted' : canVote ? 'Vote' : 'Not Registered'}
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;