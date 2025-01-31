import { useQuery } from "@tanstack/react-query";

import { getTokenPrice } from "@/actions/getTokenPrice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { fetchTransactionSummary } from "@/utils/fetchSummary";

const symbol = "ETHUSDT";

const refetchInterval = 60 * 1000; // 1 min

export default function TransactionSummary() {
  const { data: summaryData } = useQuery({
    queryKey: ["transactionSummary"],
    queryFn: fetchTransactionSummary,
    refetchInterval,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["currentPrice"],
    queryFn: () => getTokenPrice(symbol),
    refetchInterval,
  });

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-semibold">Total Transaction Fee (USDT)</p>
            {summaryData?.totalUsdtFee ?
              <p className="text-2xl">${summaryData?.totalUsdtFee.toFixed(2)}</p>
              : <Skeleton className="h-8 w-36" />
            }
          </div>
          <div>
            <p className="font-semibold">Total Transaction Fee (ETH)</p>
            {summaryData?.totalEthFee ?
              <p className="text-2xl">{summaryData?.totalEthFee.toFixed(6)} ETH</p>
              : <Skeleton className="h-8 w-36" />
            }
          </div>
          <div>
            <p className="font-semibold">Current ETH/USDT Price</p>
            {(isLoading || !data.price) ? <Skeleton className="h-8 w-36" /> : <p className="text-2xl">${Number(data?.price).toFixed(2)}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

