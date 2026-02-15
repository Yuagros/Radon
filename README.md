# Radon

Radon is now a full-stack app:
- Static marketing + dashboard pages
- Node/Express backend with SQLite persistence
- Session-based auth (hashed passwords)
- On-chain payment verification for ETH/BTC/SOL

## Requirements

- Node.js 20+
- npm 10+

## Setup

1. Install dependencies:
   - `npm install`
2. Create env:
   - Copy `.env.example` to `.env`
   - Set `SESSION_SECRET` to a long random value
3. Run dev server:
   - `npm run dev`
4. Open:
   - `http://localhost:3000`

## Scripts

- `npm run dev` start with file watching
- `npm start` production start
- `npm run lint` ESLint checks
- `npm run build` lint + build artifact in `dist/`

## Deployment notes

- Set `NODE_ENV=production`
- Set `SESSION_SECRET` (required)
- Persist `data/` between deploys to keep users, sessions, and payment records
- Optionally override RPC endpoints in `.env`
