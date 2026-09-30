# 🔐 CertVerify — Decentralized Certificate Verification DApp

A blockchain-based Web3 application designed for educational and professional certificate issuance, verification, and revocation. Built as a Semester VII Bachelor in Computer Engineering / Technology (BCT) project, this DApp leverages Ethereum smart contracts to ensure certificate immutability, tamper resistance, and decentralized verification without reliance on a centralized database.

## ✨ Features

* **Certificate Issuance**: Authorized institutions (issuers) can record tamper-proof certificate credentials directly on the blockchain.
* **Instant Verification**: Anyone can instantly verify the authenticity, expiration, and revocation status of a certificate using its unique cryptographic hash.
* **Revocation & Expiry Control**: Lifecycle management including certificate revocation by the issuer and automated timestamp-based expiration checks.
* **Decentralized & Immutable**: Once issued, certificates cannot be forged or maliciously altered.

## 🛠️ Technology Stack

* **Smart Contracts**: Solidity `^0.8.19`
* **Blockchain Development Framework**: Truffle Suite
* **Local Blockchain**: Ganache (CLI or GUI)
* **Frontend Interactivity**: Web3.js, Vanilla JavaScript, HTML5, CSS3
* **Local Server**: Lite-server (Node.js)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed globally on your machine:
* [Node.js & npm](https://nodejs.org/)
* Truffle: `npm install -g truffle`
* Ganache: [Download GUI](https://trufflesuite.com/ganache/) or install CLI `npm install -g ganache`

### Installation & Deployment

1. **Clone/Setup the Repository**
   Navigate to the project root directory.

2. **Start the Local Blockchain (Ganache)**
   Open Ganache GUI and configure a workspace, or run the CLI:
   ```bash
   ganache -p 7545
   ```
   *Note: Keep Ganache running in the background.*

3. **Compile and Migrate Smart Contracts**
   In the project root directory, run:
   ```bash
   truffle compile
   truffle migrate --network development
   ```
   This will deploy `CertVerify.sol` to your local Ganache blockchain and generate the necessary ABI artifacts in `client/src/contracts/`.

4. **Start the Frontend**
   Navigate to the `client` directory, install dependencies, and start the local web server:
   ```bash
   cd client
   npm install
   npm start
   ```
   The application should open automatically at `http://localhost:3000`.

## 📚 Project Documentation

For a deep dive into the architecture, implementation phases, and reference knowledge, check out the detailed documentation included in this repository:

* [`context.md`](./context.md) - Master project documentation, system architecture, and core workflows.
* [`phases.md`](./phases.md) - Step-by-step phased implementation plan.
* [`REFERENCE_KNOWLEDGE.md`](./REFERENCE_KNOWLEDGE.md) - Truffle + Web3.js integration patterns.
* [`SYSTEM_ARCHITECTURE.md`](./SYSTEM_ARCHITECTURE.md) - Detailed technical blueprints.
* [`SKILLS_REQUIRED.md`](./SKILLS_REQUIRED.md) - Syllabus and developer roadmap.

## 💡 Usage Guide

1. **Issue a Certificate**: Use the top panel (available to the contract deployer) to input student details and issue a certificate. Note the generated **Certificate Hash**.
2. **Verify a Certificate**: Paste the Certificate Hash into the Public Verifier panel to check its validity, issuer, and expiration date.
3. **Revoke a Certificate**: Paste the Certificate Hash into the Revoke panel to permanently invalidate it.

---
*Developed for Semester VII BCT DApp Project.*
