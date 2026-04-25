"use client";

// ============================================================
// BLINK API CLIENT — Acepta Bitcoin México
// GraphQL proxy-safe utilities for Lightning & Stablesats
// ============================================================

export const BLINK_API_URL = "https://api.blink.sv/graphql";

export interface BlinkWallet {
  id: string;
  walletCurrency: "BTC" | "USD";
  balance: number;
}

export interface BlinkInvoice {
  paymentRequest: string;
  paymentHash: string;
  paymentSecret: string;
  satoshis: number;
}

export interface BlinkNoAmountInvoice {
  paymentRequest: string;
  paymentHash: string;
  paymentSecret: string;
}

export interface BlinkOnChainAddress {
  address: string;
}

// ── Query: Get wallets & balances ──
export const ME_QUERY = `
  query Me {
    me {
      defaultAccount {
        wallets {
          id
          walletCurrency
          balance
        }
      }
    }
  }
`;

// ── Mutation: Create Lightning Invoice (BTC) ──
export const LN_INVOICE_CREATE = `
  mutation LnInvoiceCreate($input: LnInvoiceCreateInput!) {
    lnInvoiceCreate(input: $input) {
      invoice {
        paymentRequest
        paymentHash
        paymentSecret
        satoshis
      }
      errors {
        message
      }
    }
  }
`;

// ── Mutation: Create No-Amount Lightning Invoice (BTC/USD) ──
export const LN_NO_AMOUNT_INVOICE_CREATE = `
  mutation LnNoAmountInvoiceCreate($input: LnNoAmountInvoiceCreateInput!) {
    lnNoAmountInvoiceCreate(input: $input) {
      invoice {
        paymentRequest
        paymentHash
        paymentSecret
      }
      errors {
        message
      }
    }
  }
`;

// ── Mutation: Create USD Invoice (denominated in sats) ──
export const LN_USD_INVOICE_CREATE = `
  mutation LnUsdInvoiceCreate($input: LnUsdInvoiceCreateInput!) {
    lnUsdInvoiceCreate(input: $input) {
      invoice {
        paymentRequest
        paymentHash
        paymentSecret
        satoshis
      }
      errors {
        message
      }
    }
  }
`;

// ── Mutation: Get current on-chain address ──
export const ON_CHAIN_ADDRESS_CURRENT = `
  mutation OnChainAddressCurrent($input: OnChainAddressCurrentInput!) {
    onChainAddressCurrent(input: $input) {
      address
      errors {
        message
      }
    }
  }
`;

// ── Helper: Build Lightning Address URL ──
export function buildLightningAddressUrl(handle: string, amount?: number, memo?: string): string {
  const base = `https://blink.sv/.well-known/lnurlp/${handle}`;
  if (!amount) return base;
  
  const params = new URLSearchParams();
  params.set("amount", (amount * 1000).toString()); // millisats
  if (memo) params.set("comment", memo);
  return `${base}?${params.toString()}`;
}

// ── Helper: Build QR value for Lightning Address ──
export function buildQrValue(type: "lnurl" | "bolt11" | "onchain", value: string, amount?: number): string {
  switch (type) {
    case "lnurl":
      return `lightning:${value}`;
    case "bolt11":
      return `lightning:${value}`;
    case "onchain":
      return amount ? `bitcoin:${value}?amount=${(amount / 100000000).toFixed(8)}` : `bitcoin:${value}`;
    default:
      return value;
  }
}

// ── Currency formatting ──
export function formatSats(sats: number): string {
  return new Intl.NumberFormat("es-MX").format(sats);
}

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
