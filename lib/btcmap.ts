interface BtcMapMerchant {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  website: string | null;
  showing_email: boolean;
  email: string | null;
  proof: string | null;
  added_at: string | null;
  updated_at: string | null;
  categories: string[];
}

const BTCMAP_API_URL = "https://api.btcmap.org/v1";

export async function getMerchants(city: string = "Merida"): Promise<BtcMapMerchant[]> {
  try {
    const response = await fetch(`${BTCMAP_API_URL}/merchants?city=${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch merchants");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching merchants:", error);
    return [];
  }
}

export async function getMerchantById(id: string): Promise<BtcMapMerchant | null> {
  try {
    const response = await fetch(`${BTCMAP_API_URL}/merchants/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch merchant");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching merchant:", error);
    return null;
  }
}