// this is to call Binance spot API to get current ETH/USDT price

"use server";

// revalidateTag only invalidates the cache when the path is next visited. This means calling revalidateTag with a dynamic route segment will not immediately trigger many revalidations at once. The invalidation only happens when the path is next visited.
import { revalidateTag } from "next/cache";

// ETHUSDT
export async function getTokenPrice(symbol: string) {
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch prices: ${response.statusText}`);
    }

    return response.json(); // Return the parsed JSON
  } catch (error) {
    console.log("Error get token price from Binance ", error)
    throw new Error("Error get token price from Binance")
  }
}
