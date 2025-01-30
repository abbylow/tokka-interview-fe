import { TransactionQueryParams, TransactionResponse } from '@/types/transaction';

// Function to fetch transactions from the API
export async function fetchTransactions(searchParams: TransactionQueryParams): Promise<TransactionResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4242"}/api/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchParams),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
}
