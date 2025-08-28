import React from 'react';

const VotingResults = ({ candidates, totalVotes, onRefresh, isLoading }) => {
  const sortedCandidates = [...candidates].sort((a, b) => b.voteCount - a.voteCount);

  const getPercentage = (votes) => {
    return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Live Results</h2>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          {isLoading ? 'Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-6 text-center">
        <h3 className="text-lg font-semibold text-blue-800">Total Votes Cast</h3>
        <p className="text-3xl font-bold text-blue-600">{totalVotes}</p>
      </div>

      <div className="space-y-4">
        {sortedCandidates.map((candidate, index) => (
          <div key={candidate.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className={`text-lg font-bold mr-3 ${
                  index === 0 ? 'text-gold' : index === 1 ? 'text-silver' : index === 2 ? 'text-bronze' : 'text-gray-600'
                }`}>
                  #{index + 1}
                </span>
                <span className="text-lg font-semibold">{candidate.name}</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-blue-600">{candidate.voteCount}</span>
                <span className="text-sm text-gray-500 ml-2">({getPercentage(candidate.voteCount)}%)</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                }`}
                style={{ width: `${getPercentage(candidate.voteCount)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingResults;