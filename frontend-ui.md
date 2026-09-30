---
name: certverify-frontend-ui
description: Builds the CertVerify frontend with HTML, CSS, and JavaScript for issuing, verifying, retrieving, and revoking blockchain certificates with a clean college-demo interface.
---

# Frontend UI Skill

## Goal
Create a polished but simple frontend suitable for a blockchain mini-project demonstration.

## Required sections
### 1. Dashboard/header
Show:
- CertVerify
- connection status
- current Ganache account
- network/contract status

### 2. Issue Certificate
Fields:
- Student Name
- Course
- Grade
- Expiry Date

Button:
- Issue Certificate

Show after success:
- certificate hash/ID
- transaction hash
- issuer
- block number if available

### 3. Verify Certificate
Field:
- Certificate Hash/ID

Button:
- Verify Certificate

Result states:
- VALID
- EXPIRED
- REVOKED
- NOT FOUND

If valid, display certificate details.

### 4. Revoke Certificate
Field:
- Certificate Hash/ID

Button:
- Revoke Certificate

Only issuer should be able to perform this action.

## UX rules
- Use semantic HTML.
- Label every form control.
- Validate inputs before blockchain calls.
- Show loading states.
- Disable buttons while transactions are pending.
- Use clear success/error messages.
- Keep blockchain identifiers in monospace styling.
- Make the layout responsive.
- Avoid excessive animations.
- Do not use a framework unless the existing project already uses one.

## Visual direction
Use a professional academic/Web3 dashboard:
- light neutral background
- white cards
- one strong accent color
- clear status badges
- responsive two-column layout on desktop
- single-column layout on mobile

Do not sacrifice readability for visual effects.

## Accessibility
- visible labels
- keyboard-friendly controls
- sufficient contrast
- meaningful button text
- status messages accessible to screen readers where practical
