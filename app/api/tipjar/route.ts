import { NextRequest, NextResponse } from "next/server";

// ============================================================
// TIPJAR PROXY — Secure Blink GraphQL Gateway
// Acepta Bitcoin México | Oracle System v2.0
// ============================================================

const BLINK_API_URL = "https://api.blink.sv/graphql";

// ── CORS Headers ──
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ── Handle OPTIONS (CORS preflight) ──
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ── Main POST handler ──
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, variables } = body;

    // Validate operation whitelist
    const allowedOperations = [
      "LnInvoiceCreate",
      "LnNoAmountInvoiceCreate",
      "LnUsdInvoiceCreate",
      "OnChainAddressCurrent",
      "Me",
    ];

    if (!allowedOperations.includes(operation)) {
      return NextResponse.json(
        { error: "Operation not allowed", allowed: allowedOperations },
        { status: 403, headers: corsHeaders }
      );
    }

    // Get API Key from environment
    const apiKey = process.env.BLINK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Blink API key not configured" },
        { status: 500, headers: corsHeaders }
      );
    }

    // Map operation to GraphQL query/mutation
    const queryMap: Record<string, string> = {
      LnInvoiceCreate: `
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
      `,
      LnNoAmountInvoiceCreate: `
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
      `,
      LnUsdInvoiceCreate: `
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
      `,
      OnChainAddressCurrent: `
        mutation OnChainAddressCurrent($input: OnChainAddressCurrentInput!) {
          onChainAddressCurrent(input: $input) {
            address
            errors {
              message
            }
          }
        }
      `,
      Me: `
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
      `,
    };

    const query = queryMap[operation];

    // Forward to Blink API
    const blinkResponse = await fetch(BLINK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        query,
        variables: variables || {},
      }),
    });

    if (!blinkResponse.ok) {
      const errorText = await blinkResponse.text();
      return NextResponse.json(
        { error: "Blink API error", details: errorText },
        { status: blinkResponse.status, headers: corsHeaders }
      );
    }

    const data = await blinkResponse.json();
    return NextResponse.json(data, { headers: corsHeaders });

  } catch (error) {
    console.error("[TipJar Proxy Error]", error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500, headers: corsHeaders }
    );
  }
}
