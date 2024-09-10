const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const ImprovePayroll = await hre.ethers.getContractFactory("ImprovePayroll");
  const improvePayroll = await ImprovePayroll.deploy(deployer.address);

  await improvePayroll.deployed();

  console.log("ImprovePayroll deployed to:", improvePayroll.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });