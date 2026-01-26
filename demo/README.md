Getting started with AI Gateway demo

1) Create demo folder and install dependencies

```bash
mkdir demo && cd demo
pnpm init
pnpm install ai dotenv tsx @types/node
```

1) Set up authentication

Option A: API key

- Create an API key and save it to a `.env` file:

```
AI_GATEWAY_API_KEY=your_api_key_here
```

Option B: OIDC Token (Vercel)

```bash
vercel link
vercel env pull
```

1) Run the demo

```bash
pnpm tsx gateway.ts
```

The script streams generated text to stdout and prints token usage and finish reason.
