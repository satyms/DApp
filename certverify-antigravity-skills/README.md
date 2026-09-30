# CertVerify Antigravity Skills

A modular Google Antigravity Agent Skills bundle for building the Certificate Verification DApp from the supplied Experiment No. 8 / SKILLS_REQUIRED specification.

## Contents

- `01-project-orchestrator` — coordinates the complete build
- `02-solidity-contract` — smart contract implementation
- `03-truffle-ganache-deployment` — local blockchain/deployment
- `04-web3-integration` — Web3.js frontend integration
- `05-frontend-ui` — HTML/CSS/JavaScript UI
- `06-testing-debugging` — test matrix and troubleshooting
- `07-security-review` — security and integrity review
- `08-documentation-viva` — README and viva preparation
- `09-final-integration` — final smoke test and submission check
- `10-project-spec` — authoritative project requirements

## Install into an Antigravity workspace

Copy the skill folders into:

```text
<project-root>/.agents/skills/
```

The resulting structure should be:

```text
.agents/
└── skills/
    ├── 01-project-orchestrator/
    │   └── SKILL.md
    ├── 02-solidity-contract/
    │   └── SKILL.md
    ...
```

Antigravity discovers workspace skills from `.agents/skills`. Each skill is a folder containing a required `SKILL.md` with YAML frontmatter.

## Recommended first prompt in Antigravity

Use:

> Build the CertVerify Certificate Verification DApp in this workspace. Read and apply the CertVerify project skills. Start with the project orchestrator and project spec, inspect the current workspace, then implement the contract, deployment, Web3 integration, frontend, tests, and final documentation. Do not fake blockchain results. Run and verify every stage before moving to the next.

## Suggested explicit skill sequence

```text
/certverify-project-orchestrator
/certverify-solidity-contract
/certverify-truffle-ganache
/certverify-web3-integration
/certverify-frontend-ui
/certverify-testing-debugging
/certverify-security-review
/certverify-documentation-viva
/certverify-final-integration
```

Names may be exposed as slash commands according to the Antigravity surface/version.
