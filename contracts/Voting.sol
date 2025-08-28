// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedCandidateId;
    }

    address public admin;
    mapping(uint256 => Candidate) public candidates;
    mapping(address => Voter) public voters;
    uint256 public candidatesCount;
    uint256 public totalVotes;

    event CandidateAdded(uint256 indexed candidateId, string name);
    event VoterRegistered(address indexed voter);
    event VoteCasted(address indexed voter, uint256 indexed candidateId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "You are not a registered voter");
        _;
    }

    modifier hasNotVoted() {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        _;
    }

    constructor() {
        admin = msg.sender;
        candidatesCount = 0;
        totalVotes = 0;
    }

    function addCandidate(string memory _name) public onlyAdmin {
        require(bytes(_name).length > 0, "Candidate name cannot be empty");
        
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        
        emit CandidateAdded(candidatesCount, _name);
    }

    function registerVoter(address _voter) public onlyAdmin {
        require(_voter != address(0), "Invalid voter address");
        require(!voters[_voter].isRegistered, "Voter already registered");
        
        voters[_voter] = Voter(true, false, 0);
        
        emit VoterRegistered(_voter);
    }

    function vote(uint256 _candidateId) public onlyRegisteredVoter hasNotVoted {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedCandidateId = _candidateId;
        
        candidates[_candidateId].voteCount++;
        totalVotes++;
        
        emit VoteCasted(msg.sender, _candidateId);
    }

    function getCandidate(uint256 _candidateId) public view returns (uint256, string memory, uint256) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        
        for (uint256 i = 1; i <= candidatesCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }
        
        return allCandidates;
    }

    function getVoterInfo(address _voter) public view returns (bool, bool, uint256) {
        Voter memory voter = voters[_voter];
        return (voter.isRegistered, voter.hasVoted, voter.votedCandidateId);
    }
}