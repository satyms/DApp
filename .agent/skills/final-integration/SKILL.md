---
name: final-integration
description: End-to-end integration checklist, final smoke tests, live transaction verification, and delivery acceptance procedure for CertVerify DApp.
---

# Final Integration & Delivery Skill

## Goal
Conduct final smoke tests and verify that the complete end-to-end flow from browser UI to the Ganache EVM functions without defects.

## Final Smoke Test Sequence

### Step 1: Network & Node Check
1. Start Ganache GUI and verify RPC is listening on `127.0.0.1:7545`.
2. Confirm 10 test accounts are visible with `100 ETH` initial balance.

### Step 2: Clean Compilation & Migration
```bash
# 1. Compile cleanly
truffle compile

# 2. Migrate to local network
truffle migrate --network development --reset
```
Verify:
- `CertVerify` contract address printed in terminal.
- `client/src/contracts/CertVerify.json` updated with new network ID and contract address.

### Step 3: Launch Local Client Server
```bash
cd client
npm start
```
Browser opens automatically at `http://localhost:3000`.

### Step 4: UI Functional Verification
1. **Header Check**:
   - Verify connected account matches Ganache Account 0 (`0x...`).
   - Verify contract address matches the deployed address.
2. **Issuance Check**:
   - Enter student details and valid future date.
   - Click "Issue Certificate".
   - Confirm Ganache mines a new block and deducts a small gas fee from Account 0.
   - Confirm green success card appears with Tx Hash and Certificate Hash.
3. **Verification Check**:
   - Copy Certificate Hash and paste into Verify Panel.
   - Click "Verify Certificate".
   - Confirm green "AUTHENTIC & VALID CERTIFICATE" status with matching student details.
4. **Revocation Check**:
   - Paste Certificate Hash into Revoke Panel.
   - Click "Revoke Certificate".
   - Re-verify same hash in Verify Panel.
   - Confirm red "CERTIFICATE HAS BEEN REVOKED" status is shown.

## Final Delivery Checklist
- [ ] No simulated or mock data used.
- [ ] All 3 core operations (`issue`, `verify`, `revoke`) working on-chain.
- [ ] Clear error handling for invalid or expired hashes.
- [ ] Clean, presentable UI ready for examiner review.
