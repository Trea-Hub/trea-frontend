# Contributing to Trea Frontend

Thanks for considering contributing. This repo is the web app for Trea. It talks directly to the [Trea smart contract](https://github.com/Trea-Hub/trea-contract) for all payment/registration/refund actions, and to [trea-backend](https://github.com/Trea-Hub/trea-backend) for read-only data like event listings and photos.

## Code of conduct

Be respectful, assume good faith, and keep disagreements about the code, not the person. Harassment or abusive behavior toward maintainers or other contributors will result in removal from the project and its communication channels.

## Ways to contribute

- UI/UX improvements to event discovery, registration, and photo-sharing flows
- Wallet connection and transaction-signing reliability (error states, network mismatches, rejected signatures)
- Accessibility improvements
- Bug fixes and test coverage
- Documentation

If you found this repo through **Drips Wave**, issues there are tagged with a complexity/point value (Trivial / Medium / High). Comment on the issue to claim it before starting work.

## Project setup

### Prerequisites

- Node.js 20+
- A Stellar wallet browser extension (e.g. Freighter), set to Testnet
- A running or public dev instance of [trea-backend](https://github.com/Trea-Hub/trea-backend)
- A Testnet contract ID from [trea-contract](https://github.com/Trea-Hub/trea-contract)

### Setup

```bash
git clone https://github.com/Trea-Hub/trea-frontend.git
cd trea-frontend
npm install
cp .env.local.example .env.local
npm run dev
```

## Branching and commits

- Branch off `main`: `git checkout -b feat/short-description` or `fix/short-description`.
- Keep commits scoped to one logical change.
- Write commit messages in the imperative mood: `Add refund confirmation modal`, not `Added`.

## Coding conventions

- TypeScript throughout — avoid `any` where a real type is knowable.
- **Never build a transaction that bypasses the user's wallet for signing.** All contract calls go through `lib/contract.ts` and the wallet kit — no client-side private key handling, ever, under any circumstance.
- Every action that costs money or changes on-chain state (register, refund, payout) needs a clear confirmation step in the UI before the wallet signing prompt — don't fire transactions on a single accidental click.
- Handle and surface wallet errors distinctly: user rejected the signature, wrong network selected, insufficient balance, and RPC/network failure are all different states and should show different messages, not one generic "something went wrong."
- Keep contract-calling logic in `lib/contract.ts`, not scattered across components — components should call a named function like `registerForEvent(eventId)`, not construct transactions inline.

## Tests

- New components involving contract calls should mock `lib/contract.ts`, not hit a real network.
- Cover at least: happy path, wallet rejects signature, wallet not connected.
- Run the full suite before opening a PR: `npm test`.

## Pull requests

1. Make sure the app builds and tests pass locally (`npm run build`, `npm test`).
2. Reference the issue you're closing, e.g. `Closes #12`.
3. Describe **what changed and why**, especially for anything touching transaction-building or wallet flows.
4. Include a screenshot or short clip for UI changes.
5. Keep PRs focused on one issue.
6. A maintainer will review, may request changes, and will merge once checks and review pass.

## Reporting bugs

Open an issue with:
- Expected vs. actual behavior
- Steps to reproduce
- Wallet used, network (Testnet/Mainnet), and browser
- Console errors, if any

## Reporting security issues

**Do not open a public issue** for anything involving transaction-signing bugs, private key exposure, or ways a user could be tricked into signing something unintended. Contact the maintainers privately first. *(Add a security contact once one exists.)*

## Questions

Open a discussion or issue if something here is unclear.