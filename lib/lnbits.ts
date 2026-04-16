interface LNbitsWallet {
  id: string;
  name: string;
  balance: number;
}

interface LNbitsInvoice {
  payment_hash: string;
  payment_request: string;
  amount: number;
  memo: string;
  status: "pending" | "paid" | "expired";
}

const LNBITS_API_URL = process.env.LNBITS_API_URL || "";
const LNBITS_API_KEY = process.env.LNBITS_API_KEY || "";

export async function createInvoice(
  amount: number,
  memo: string,
  expiryMinutes: number = 60
): Promise<LNbitsInvoice | null> {
  try {
    const response = await fetch(`${LNBITS_API_URL}/api/v1/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LNBITS_API_KEY}`,
      },
      body: JSON.stringify({
        out: false,
        amount: amount,
        memo: memo,
        expiry: expiryMinutes * 60,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create invoice");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating invoice:", error);
    return null;
  }
}

export async function checkInvoice(paymentHash: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${LNBITS_API_URL}/api/v1/payments/${paymentHash}`,
      {
        headers: {
          Authorization: `Bearer ${LNBITS_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.details?.paid ?? false;
  } catch (error) {
    console.error("Error checking invoice:", error);
    return false;
  }
}