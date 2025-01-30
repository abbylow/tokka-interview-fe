import type { Transaction } from "@/types/transaction"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TransactionSummaryProps {
  transactions: Transaction[]
}

export default function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const totalFeeUSDT = transactions.reduce((sum, tx) => sum + Number(tx.usdt_fee), 0)
  const totalFeeETH = transactions.reduce((sum, tx) => sum + Number(tx.eth_fee), 0)

  const curentETHUSDTPrice = 3333; // TODO: get this from external API

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-semibold">Total Transaction Fee (USDT)</p>
            <p className="text-2xl">${totalFeeUSDT.toFixed(2)}</p>
          </div>
          <div>
            <p className="font-semibold">Total Transaction Fee (ETH)</p>
            <p className="text-2xl">{totalFeeETH.toFixed(6)} ETH</p>
          </div>
          <div>
            <p className="font-semibold">Current ETH/USDT Price</p>
            <p className="text-2xl">${curentETHUSDTPrice.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

