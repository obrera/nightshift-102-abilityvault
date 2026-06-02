# AbilityVault

AbilityVault is Nightshift build 102: a dark-mode Solana game ability-tree vault where players compose a playable character ability page, simulate readiness and synergy, preview first-party JSON/SVG metadata, verify assets, and mint the finished page as a connected-wallet-signed MPL Core devnet asset.

## Capabilities

- Ability tree builder with class, role, element, passive, rune sockets, and up to five ability nodes.
- Combat simulation for power, defense, tempo, control, synergy, rarity, readiness, and mint warnings.
- First-party metadata and SVG routes: `/api/metadata/:code` and `/api/art/:code`.
- Asset verifier for MPL Core asset address and transaction signature checks.
- Client-side wallet-signed MPL Core mint flow using `@wallet-ui/react`, Solana Kit, and `@obrera/mpl-core-kit-lib`.

## Solana Architecture

The mint flow is wallet-signed in the browser. The connected wallet signs as payer, owner, and update authority. The browser generates the new MPL Core asset signer and submits a `createV1` transaction through Solana Kit. The server only serves the built SPA plus health, metadata, and art routes.

This app intentionally does not use `@solana/web3.js`, `@solana/wallet-adapter-react`, server signers, pasted destination wallet minting, or Node `Buffer` in app/server source.

## Local Commands

```bash
bun install
bun run lint:fix
bun run check-types
bun run build
bun run smoke
bun run serve
```

The Hono/Bun server listens on port `3000` and serves `/api/health`, `/api/metadata/:code`, `/api/art/:code`, static assets, and the SPA fallback.

## Docker

```bash
docker compose up --build
```

The single container exposes port `3000` and defaults `PUBLIC_BASE_URL` to `https://abilityvault102.colmena.dev`.
