import React, { useState } from 'react';

const AdminPanel = ({ 
  isAdmin, 
  onAddCandidate, 
  onRegisterVoter, 
  isLoading 
}) => {
  const [candidateName, setCandidateName] = useState('');
  const [voterAddress, setVoterAddress] = useState('');
  const [adding, setAdding] = useState(false);
  const [registering, setRegistering] = useState(false);

  if (!isAdmin) return null;

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    if (!candidateName.trim()) return;

    try {
      setAdding(true);
      await onAddCandidate(candidateName.trim());
      setCandidateName('');
    } catch (error) {
      console.error('Failed to add candidate:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleRegisterVoter = async (e) => {
    e.preventDefault();
    if (!voterAddress.trim()) return;

    try {
      setRegistering(true);
      await onRegisterVoter(voterAddress.trim());
      setVoterAddress('');
    } catch (error) {
      console.error('Failed to register voter:', error);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-yellow-800 mb-4">🔐 Admin Panel</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Candidate */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Add Candidate</h3>
          <form onSubmit={handleAddCandidate}>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter candidate name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              disabled={adding || isLoading}
            />
            <button
              type="submit"
              disabled={!candidateName.trim() || adding || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              {adding ? 'Adding...' : 'Add Candidate'}
            </button>
          </form>
        </div>

        {/* Register Voter */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Register Voter</h3>
          <form onSubmit={handleRegisterVoter}>
            <input
              type="text"
              value={voterAddress}
              onChange={(e) => setVoterAddress(e.target.value)}
              placeholder="Enter voter address (0x...)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              disabled={registering || isLoading}
            />
            <button
              type="submit"
              disabled={!voterAddress.trim() || registering || isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              {registering ? 'Registering...' : 'Register Voter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;