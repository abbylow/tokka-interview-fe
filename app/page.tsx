"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import TransactionForm from "@/components/TransactionForm";
import TransactionSummary from "@/components/TransactionSummary";
import { TransactionQueryParams, TransactionResponse } from "@/types/transaction";
import { fetchTransactions } from "@/utils/fetchTransactions";

const defaultPageSize = 50;
const refetchInterval = 60 * 1000; // 1 min

export default function Home() {
  const [searchParams, setSearchParams] = useState<TransactionQueryParams>({
    txHash: "",
    startTimestamp: 0,
    endTimestamp: Math.floor(Date.now() / 1000),
    page: 1,
    limit: defaultPageSize,
  })

  const { data: transactionData, isLoading, error } = useQuery<TransactionResponse, Error>({
    queryKey: ['transactions'],
    queryFn: () => fetchTransactions(searchParams),
    refetchInterval: refetchInterval
  });

  const handleSearch = async (txHash: string, startTimestamp: number, endTimestamp: number) => {
    setSearchParams((prev) => ({
      ...prev,
      txHash,
      startTimestamp,
      endTimestamp,
      page: 1, // reset to first page on new search
    }))
  }
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Uniswap WETH-USDC Transaction Explorer</h1>

      <TransactionForm onSearch={handleSearch} />

      <TransactionSummary transactions={[]} />
    </main>
  )
}


