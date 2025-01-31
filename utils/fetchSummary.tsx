interface TransactionSummaryResponse {
  totalEthFee: number;
  totalUsdtFee: number;
}

export async function fetchTransactionSummary(): Promise<TransactionSummaryResponse> {
  const response = await fetch("/transactions-summary", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transaction summary");
  }

  return response.json();
}