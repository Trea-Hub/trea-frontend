# Trea Frontend

Web app for **Trea**, an event registration and ticketing platform on Stellar/Soroban. Built with Next.js. Attendees browse events, connect a Stellar wallet, and register/pay/refund by signing transactions **directly against the smart contract** — this app never routes payment or registration actions through a backend.

> Status: early development.

---

## How it works

- All contract-changing actions (`register`, `refund`, `check_in`, `payout`) are built client-side using `@stellar/stellar-sdk` and signed by the user's own wallet via `@creit.tech/stellar-wallets-kit`. Nothing about payment or registration passes through the backend — the frontend talks to the Soroban RPC and the contract directly.
- Read-heavy views (event lists, search, photos) are served by the [Trea backend](https://github.com/Trea-Hub/trea-backend), which maintains an indexed, read-optimized copy of on-chain state plus off-chain metadata.
- Event photos are only visible/uploadable to wallets the backend confirms are registered attendees for that event.

## Tech stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS**
- **`@stellar/stellar-sdk`** — building and submitting transactions
- **`@creit.tech/stellar-wallets-kit`** — wallet connection (Freighter and others)

## Repo structure

```
.
├── app/
│   ├── events/
│   │   ├── page.tsx           # event list (from backend)
│   │   └── [id]/
│   │       ├── page.tsx        # event detail, register/refund actions
│   │       └── photos/page.tsx # attendee photo gallery
│   └── layout.tsx
├── lib/
│   ├── stellar.ts              # wallet connect helpers
│   └── contract.ts             # typed wrappers for calling contract functions
├── components/                 # shared UI
├── .env.local.example
├── package.json
└── tsconfig.json
```

## Getting started

### Prerequisites

- Node.js 20+
- A Stellar wallet browser extension (e.g. Freighter) set to Testnet, for local development
- A running instance of [trea-backend](https://github.com/Trea-Hub/trea-backend), or its public dev URL

### Setup

```bash
git clone https://github.com/<org>/trea-frontend.git
cd trea-frontend
npm install
cp .env.local.example .env.local   # fill in backend URL, contract ID, network
npm run dev
```

### Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_STELLAR_NETWORK` | `testnet` or `mainnet` |
| `NEXT_PUBLIC_STELLAR_RPC_URL` | Soroban RPC endpoint |
| `NEXT_PUBLIC_CONTRACT_ID` | Deployed `EventRegistration` contract ID |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the trea-backend API |

## Calling the contract

Contract interactions go through `lib/contract.ts`, which wraps the raw `stellar-sdk` transaction-building calls with typed functions matching the contract's interface (`createEvent`, `register`, `refund`, `checkIn`, `payout`). Every one of these builds a transaction, hands it to the wallet kit for signing, and submits it — the user always sees and approves the transaction in their wallet before anything is sent.

## Related repos

- Smart contract: [trea-contract](https://github.com/Trea-Hub/trea-contract)
- Backend: [trea-backend](https://github.com/Trea-Hub/trea-backend)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).