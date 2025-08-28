const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  let voting;
  let admin;
  let voter1;
  let voter2;

  beforeEach(async function () {
    [admin, voter1, voter2] = await ethers.getSigners();
    
    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();
  });

  describe("Basic Functionality", function () {
    it("Should deploy with correct admin", async function () {
      expect(await voting.admin()).to.equal(admin.address);
      expect(await voting.candidatesCount()).to.equal(0);
    });

    it("Should add candidates", async function () {
      await voting.addCandidate("Alice");
      expect(await voting.candidatesCount()).to.equal(1);
      
      const candidate = await voting.getCandidate(1);
      expect(candidate[1]).to.equal("Alice");
    });

    it("Should register voters and allow voting", async function () {
      await voting.addCandidate("Alice");
      await voting.addCandidate("Bob");
      
      await voting.registerVoter(voter1.address);
      await voting.connect(voter1).vote(1);
      
      const candidate = await voting.getCandidate(1);
      expect(candidate[2]).to.equal(1); // vote count
      
      expect(await voting.totalVotes()).to.equal(1);
    });

    it("Should prevent double voting", async function () {
      await voting.addCandidate("Alice");
      await voting.registerVoter(voter1.address);
      
      await voting.connect(voter1).vote(1);
      
      await expect(
        voting.connect(voter1).vote(1)
      ).to.be.revertedWith("You have already voted");
    });
  });
});