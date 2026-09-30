---
name: frontend-ui
description: Builds the HTML5, CSS3, and JavaScript user interface for CertVerify, providing dedicated panels for certificate issuance, public verification, and certificate revocation.
---

# Frontend UI Skill

## Goal
Implement a responsive, clean, and intuitive web user interface allowing both certificate issuers and public verifiers to interact with the Ethereum blockchain.

## UI Structure (`client/index.html`)
The application is split into three main cards:
1. **Header**:
   - Application branding and title.
   - Connected Ganache Account display (`0x...`).
   - Active Contract Address display.
2. **Issuer Panel (`#issuer-panel`)**:
   - Form inputs: Recipient Name, Course Name, Grade / Score, Expiration Date.
   - Action Button: "Issue Certificate".
   - Result Box: Displays transaction hash, certificate hash ID, and confirmation details.
3. **Verifier Panel (`#verifier-panel`)**:
   - Form input: Certificate Hash ID (32-byte hex).
   - Action Button: "Verify Certificate".
   - Result Box: Displays formatted certificate details (recipient, course, grade, dates, issuer) or failure reasons (REVOKED, EXPIRED, NOT FOUND).
4. **Revoke Panel (`#revoke-panel`)**:
   - Form input: Certificate Hash ID to revoke.
   - Action Button: "Revoke Certificate".
   - Result Box: Displays revocation transaction receipt.

## Styling Guidelines (`client/css/styles.css`)
- **Modern Clean Layout**: CSS Grid / Flexbox with card-based panels.
- **Feedback States**:
  - `.success`: Green theme for valid verifications and confirmed issuances.
  - `.error`: Red theme for reverted transactions, revoked certificates, or invalid hashes.
  - `.warning`: Yellow/amber theme for expired certificates.
  - `.info`: Blue theme for pending / in-progress transaction notices.

## Client Server
Configured with `lite-server` (`client/bs-config.js`) listening on `http://localhost:3000`.
