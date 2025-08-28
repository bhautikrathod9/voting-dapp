const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Voting contract...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  console.log("Voting contract deployed to:", await voting.getAddress());
  
  // Add sample candidates
  await voting.addCandidate("Alice Johnson");
  await voting.addCandidate("Bob Smith");
  console.log("Sample candidates added!");

  const candidates = await voting.getAllCandidates();
  console.log("\nCandidates:");
  for (let i = 0; i < candidates.length; i++) {
    console.log(`${candidates[i].id}: ${candidates[i].name}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });