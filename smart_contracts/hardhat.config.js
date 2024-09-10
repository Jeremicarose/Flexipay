require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config(); // To load environment variables from .env file

module.exports = {
  solidity: "0.8.20",
  networks: {
    baseSepolia: {
      url: "https://sepolia.base.org", // Base Sepolia RPC URL
      chainId: 84532, // Chain ID for Base Sepolia
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Your private key stored in .env file
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // Optional: for verifying contracts
  },
};
