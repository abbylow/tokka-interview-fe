import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TransactionFormProps {
  onSearch: (txHash: string, startTimestamp: number, endTimestamp: number) => void,
  isLoading: boolean,
}

export default function TransactionForm({ onSearch, isLoading }: TransactionFormProps) {
  const [txHash, setTxHash] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert start date to start of day timestamp
    const startTimestamp = startDate ? Math.floor(new Date(startDate).setHours(0, 0, 0, 0) / 1000) : 0;

    // Convert end date to end of day timestamp
    const endTimestamp = endDate ? Math.floor(new Date(endDate).setHours(23, 59, 59, 999) / 1000) : Math.floor(Date.now() / 1000);
    
    // Validate that the start timestamp is earlier than the end timestamp
    if (startTimestamp > endTimestamp) {
      // You can replace this with a toast notification or other error handling method
      alert("Start date must be earlier than the end date")
      return
    }

    onSearch(txHash, startTimestamp, endTimestamp)
  }

  const handleClear = () => {
    setTxHash("")
    setStartDate("")
    setEndDate("")
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Search Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="txHash">Transaction Hash</Label>
              <Input
                type="text"
                id="txHash"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="Enter transaction hash"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-between">
            <Button type="submit" disabled={isLoading}>Search</Button>
            <Button type="button" variant="outline" disabled={isLoading} onClick={handleClear}>Clear Form</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

