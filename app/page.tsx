"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

import TransactionForm from "@/components/TransactionForm";
import TransactionSummary from "@/components/TransactionSummary";
import TransactionList from "@/components/TransactionList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionQueryParams, TransactionResponse } from "@/types/transaction";
import { fetchTransactions } from "@/utils/fetchTransactions";

const defaultPageSize = 50;
const refetchInterval = 5 * 60 * 1000; // 5 min

const defaultTransactionData = {
  transactions: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: defaultPageSize
}

export default function Home() {
  const [searchParams, setSearchParams] = useState<TransactionQueryParams>({
    txHash: "",
    startTimestamp: 0,
    endTimestamp: Math.floor(Date.now() / 1000),
    page: 1,
    limit: defaultPageSize,
  })

  const { data, isLoading, error } = useQuery<TransactionResponse, Error>({
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

  const handlePageChange = async (page: number, limit: number) => {
    setSearchParams((prev) => ({
      ...prev,
      page,
      limit
    }))
  }
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Uniswap WETH-USDC Transaction Explorer</h1>

      <TransactionForm onSearch={handleSearch} isLoading={isLoading} />

      <TransactionSummary />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      
      {
        isLoading ?
          <Skeleton className="w-full h-96 animate-pulse" />
          :
          <TransactionList
            transactionData={data || defaultTransactionData}
            onPageChange={handlePageChange}
          />
      }

    </main>
  )
}


