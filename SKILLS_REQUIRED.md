# Skills Required - Certificate Verification Dapp Project

## 1. Blockchain & Ethereum Concepts

### Understanding Blockchain Basics
- What is blockchain? (Immutable, decentralized ledger)
- How blocks and hashes work
- What is Ethereum and EVM (Ethereum Virtual Machine)
- Concept of smart contracts
- Gas and transaction costs
- Public and private keys

### Ethereum Knowledge
- Ethereum addresses (0x format)
- Accounts and their states
- Transactions vs Calls
- Block timestamp and mining
- Events and event logs

---

## 2. Solidity Programming

### Language Fundamentals
- Variables and data types (string, uint, address, bytes32, bool)
- Functions and visibility (public, private, internal)
- Structs and Enums
- Mappings and Arrays
- Control flow (if, for, while)
- Error handling (require, assert, revert)

### Solidity Specific Concepts
- `msg.sender` - get function caller address
- `msg.value` - get Ether value sent
- `block.timestamp` - get current time
- Modifiers (for function restrictions)
- Events (for logging)
- Constructor (initialize contract)
- State variables vs local variables

### Smart Contract Patterns
- Access control (who can call what)
- State management
- Secure coding practices
- Gas optimization

---

## 3. Solidity for This Project

**Data Structures Needed:**
- Struct to define Certificate
- Mapping to store certificates by hash
- Address to identify issuer

**Functions to Write:**
- issueCertificate() - write to blockchain
- verifyCertificate() - read from blockchain
- getCertificate() - retrieve data
- revokeCertificate() - modify state

**Concepts Used:**
- keccak256 hashing (create unique certificate ID)
- require() for validation
- Events for logging
- Conditional logic (check expiry, active status)

---

## 4. Truffle Framework

### What Truffle Does
- Compile Solidity code
- Deploy contracts to blockchain
- Run tests
- Manage contract artifacts (ABI, bytecode)

### Key Truffle Skills
- Project structure and conventions
- `truffle init` - initialize project
- `truffle compile` - compile contracts
- `truffle migrate` - deploy to network
- `truffle console` - interact with contracts
- Writing migration files (tell Truffle how to deploy)

### For This Project
- Create CertVerify.sol in contracts/
- Create 2_certverify_migration.js
- Run `truffle compile`
- Run `truffle migrate --network development`

---

## 5. Ganache (Local Blockchain)

### What Ganache Does
- Runs local Ethereum test network
- Provides 10 test accounts with fake ETH
- Mines blocks instantly
- Shows transaction details

### Ganache Skills
- Start Ganache (ganache-cli command)
- Default RPC: http://localhost:7545
- View accounts and balances
- Monitor transactions and blocks
- Reset blockchain if needed

### For This Project
- Run ganache-cli in terminal
- Note the RPC port (7545)
- Keep it running while testing

---

## 6. Web3.js Library

### What Web3.js Does
- Bridge between frontend and blockchain
- Send transactions to smart contracts
- Read data from blockchain
- Connect via HTTP/RPC

### Web3.js Concepts
- Provider (connection to blockchain node)
- Web3 instance (main object)
- Contract instance (interact with specific contract)
- Methods (call contract functions)
- Sending transactions vs reading data

### Key Web3.js Skills
- `new Web3(provider)` - create Web3 instance
- `web3.eth.Contract()` - create contract instance
- `contract.methods.functionName()` - prepare function call
- `.call()` - read-only function (no gas)
- `.send()` - write function (costs gas)
- `web3.eth.getAccounts()` - get user accounts

### For This Project
```javascript
// Connect to Ganache
const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(provider);

// Create contract instance
const contract = new web3.eth.Contract(ABI, address);

// Call functions
contract.methods.verifyCertificate(hash).call()
contract.methods.issueCertificate(name, course, grade, expiry).send()
```

---

## 7. Frontend Development

### HTML Skills
- Form elements (input, button)
- Displaying data (divs, paragraphs, tables)
- Semantic HTML structure
- IDs and classes for styling/interaction

### CSS Skills
- Styling forms and buttons
- Layout and spacing (margin, padding)
- Colors and fonts
- Responsive design
- Input field styling

### JavaScript Skills
- DOM manipulation (document.getElementById, innerHTML)
- Event listeners (onclick, onsubmit)
- Form validation
- String manipulation
- Promise handling (async/await for transactions)

### jQuery (Optional but used)
- DOM selection ($)
- Event handling
- AJAX requests
- Simpler syntax than vanilla JS

---

## 8. Frontend for This Project

### index.html
- Create form with inputs for:
  - Issue Certificate: name, course, grade, expiry
  - Verify Certificate: certificate hash
- Display areas for results
- Link to JavaScript files

### index.js
- Get form inputs
- Call Web3.js methods
- Display results to user
- Handle errors
- Show transaction confirmation

### utils.js
- `getWeb3()` - Connect to Ganache
- `getContract()` - Load ABI and create instance
- `getCurrentAccount()` - Get sender address
- Export these for index.js to use

---

## 9. Node.js & npm

### Node.js Concepts
- JavaScript runtime outside browser
- npm (Node Package Manager)
- package.json (list of dependencies)
- node_modules (installed packages)

### npm Skills
- `npm init` - create package.json
- `npm install package-name` - install package
- `npm install -g package-name` - install globally
- `npm start` - run start script
- package.json scripts section

### For This Project
```bash
# Project root
npm install

# Client folder
cd client
npm init
npm install web3
npm install lite-server --save-dev
npm install jquery
```

---

## 10. Command Line / Terminal

### Basic Terminal Skills
- Navigate folders (cd, ls, pwd)
- Create folders (mkdir)
- Run commands
- Kill processes (Ctrl+C)

### For This Project
```bash
# Create project
mkdir dapp-demo
cd dapp-demo

# Initialize Truffle
truffle init

# Compile
truffle compile

# Deploy (in separate terminal with Ganache running)
truffle migrate --network development

# Setup frontend
cd client
npm init
npm install web3 lite-server jquery

# Run
npm start
```

---

## 11. Problem-Solving & Debugging

### Skills Needed
- Read error messages carefully
- Check Ganache logs
- Use browser console (F12)
- Check if Ganache is running
- Verify contract deployed to correct network
- Check Web3.js connection
- Validate form inputs

### Common Issues & Fixes
- "Contract not found" → Redeploy or check address
- "Not authorized" → Verify sender is issuer
- "No RPC connection" → Start Ganache
- "Transaction reverted" → Check require() conditions
- "Certificate hash not found" → Verify correct hash entered

---

## 12. Knowledge Summary Table

| Skill | Used For | Level |
|-------|----------|-------|
| Solidity | Write smart contract | Core |
| Ethereum Basics | Understand blockchain | Core |
| Truffle | Compile & deploy | Core |
| Ganache | Local testing | Core |
| Web3.js | Frontend connection | Core |
| JavaScript | Frontend logic | Core |
| HTML/CSS | User interface | Supporting |
| npm | Manage dependencies | Supporting |
| Terminal | Run commands | Supporting |
| Debugging | Fix issues | Supporting |

---

## 13. Learning Path (Recommended Order)

1. **Day 1**: Blockchain & Ethereum basics + Solidity intro
2. **Day 2**: Write CertVerify.sol smart contract
3. **Day 3**: Truffle setup + Deploy contract
4. **Day 4**: Web3.js + Frontend basics (HTML)
5. **Day 5**: Connect frontend to contract (JavaScript)
6. **Day 6**: Test and debug
7. **Day 7**: Polish UI and prepare for presentation

---

## 14. Testing Knowledge Required

### What to Test
- Each smart contract function works
- Invalid inputs are rejected
- Only issuer can issue/revoke
- Expired certificates show as invalid
- Frontend connects to contract
- Transactions confirm on Ganache

### Testing Skills
- Manual testing (clicking buttons)
- Checking Ganache logs
- Reading error messages
- Understanding transaction receipts

---

## 15. Presentation Skills

### For Viva/Demo
- Explain blockchain basics
- Explain how smart contract works
- Show contract code and functions
- Demo: Issue certificate
- Demo: Verify certificate
- Explain why blockchain needed
- Answer questions about architecture

### Knowledge to Have
- Why use blockchain for certificates?
- What does immutability mean?
- How is certificate verified?
- What are advantages over database?
- How does smart contract control access?

---

**Total Skills: 15 Categories**  
**Core Skills: 5**  
**Difficulty Level: Beginner to Intermediate**  
**Time to Learn: 1-2 weeks** (with basics already known)
