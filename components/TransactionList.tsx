import type { TransactionResponse } from "@/types/transaction"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const allowedPageSizes = [10, 20, 50, 100]

interface TransactionListProps {
  transactionData: TransactionResponse
  onPageChange: (page: number, limit: number) => void
}

export default function TransactionList({ transactionData, onPageChange }: TransactionListProps) {
  const { transactions, totalCount, currentPage, pageSize } = transactionData
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Hash</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Fee (USDT)</TableHead>
              <TableHead className="text-right">Fee (ETH)</TableHead>
              <TableHead className="text-right">ETH/USDT Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.hash}>
                <TableCell>
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`${tx.hash.slice(0, 5)}.....${tx.hash.slice(-5)}`}
                  </a>
                </TableCell>
                <TableCell>{new Date(tx.timestamp * 1000).toLocaleString()}</TableCell>
                <TableCell className="text-right">{Number(tx.usdt_fee).toFixed(2)}</TableCell>
                <TableCell className="text-right">{Number(tx.eth_fee).toFixed(6)}</TableCell>
                <TableCell className="text-right">{Number(tx.eth_price_at_tx).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span>Page Size:</span>
            <Select value={pageSize.toString()} onValueChange={(value) => onPageChange(1, Number(value))}>
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {
                  allowedPageSizes.map(size => (
                    <SelectItem key={size.toString()} value={size.toString()}>{size}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => onPageChange(currentPage - 1, pageSize)}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => onPageChange(currentPage + 1, pageSize)}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

