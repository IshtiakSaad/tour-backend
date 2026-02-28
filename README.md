# Backend

This is the backend for the PH Tour project. It is a TypeScript/Express application using MongoDB.

## Setup

1. Copy `.env.example` to `.env` and provide values for `PORT`, `DB_URL`, and `NODE_ENV`.
2. Install dependencies in the `backend` folder:
```bash
npm install
```

## Development

Run the development server with:
```bash
npm run dev
```

The script uses `ts-node-dev` with the `ts-node/esm` loader.  If environment variables are missing the process will exit with a clear error message.

---
