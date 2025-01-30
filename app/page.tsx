"use client";

import { useState } from "react";

import TransactionForm from "@/components/TransactionForm";
import TransactionSummary from "@/components/TransactionSummary";
import { TransactionResponse } from "@/types/transaction";

export default function Home() {
  const [transactionData, setTransactionData] = useState<TransactionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (txId: string, startTimestamp: number, endTimestamp: number, page = 1, pageSize = 50) => {
    setLoading(true)
    setError(null)

    console.log({ txId, startTimestamp, endTimestamp, page, pageSize })
    try {
      // TODO: get tx data by filter
      // setTransactionData(data)
    } catch (err) {
      setError("An error occurred while fetching transactions")
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Uniswap WETH-USDC Transaction Explorer</h1>

      <TransactionForm onSearch={handleSearch} />

      <TransactionSummary transactions={[]} />
    </main>
  )
}


