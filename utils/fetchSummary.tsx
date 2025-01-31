interface TransactionSummaryResponse {
  totalEthFee: number;
  totalUsdtFee: number;
}

export async function fetchTransactionSummary(): Promise<TransactionSummaryResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4242"}/api/transactions-summary`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transaction summary");
  }

  return response.json();
}