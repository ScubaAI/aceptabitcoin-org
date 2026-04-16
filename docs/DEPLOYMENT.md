# Deployment Guide

## Prerequisites

- Node.js 18+
- Vercel account (recommended) or any hosting platform

## Environment Variables

Set the following environment variables in your deployment platform:

```
LNBITS_API_URL=your-lnbits-instance.com
LNBITS_API_KEY=your-api-key
BTCMAP_API_KEY=your-btcmap-api-key
NEXT_PUBLIC_TIP_JAR_LN_ADDRESS=tip@your-domain.com
```

## Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

## Build for Production

```bash
npm run build
npm start
```