## FlexiPay

### Description

FlexiPay is a salary payment system designed to ensure freelancers receive their payments securely and promptly. The project includes a smart contract, a TheGraph subgraph index, and a web application. The smart contract enables business entities can  and lock their organization’s account, providing freelancers/employees assurance that their salary will be paid in advance. Additionally, the system allows freelancers/employees to trigger payments at any time after their work has been registered.

### Tech Stack

#### Smart Contract

- Solidity
- Hardhat
- Base Chain (Base-Sepolia)


#### Indexing and Data Query

- TheGraph
- @apollo/client for querying data from Subgraph (GraphQL)

#### Web Application

- React/NextJs
- Typescript
- MUI for UI components

#### Blockchain Interaction

- Wagmi
- Viem

#### Additional Integrations

- ENS for front-end employee registration
- WalletConnect for wallet integration
- BlockScout for smart contract verification and on-chain activity viewing

### Features

- Business entities can fund and lock their organization’s account in advance.
- Freelancers can trigger payments at any time after the work has been registered.
- Ensures participation of unbanked individuals in the global financial system through blockchain payments.
- Records financial activity on-chain for transparency and accountability.
- Uses ENS for simplified and secure employee registration.
- Integrates WalletConnect for seamless wallet interactions.
- Smart contract and on-chain activities can be viewed and verified on BlockScout.

### How It Works

1. **Business Entities Registration**:  Business entities register their organization and fund their account.
2. **Freelancers Registration**: Freelancers register using ENS.
3. **Work Registration**: Freelancers log their work days.
4. **Payment Trigger**: Business entities can trigger the payment process anytime after work registration, ensuring timely and secure payment.

### Getting Started

1. Clone the repository.
2. Install dependencies:
   npm install
3.	Deploy the smart contract using Hardhat.
4.	Set up TheGraph subgraph to index on-chain events.
5.	Run the web application:
   npm run dev
  	
Link to project website: 

Link to project smart contract: 
