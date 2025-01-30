export interface Transaction {
  id: number;                  // Unique transaction ID (auto-incremented)
  hash: string;                // Ethereum transaction hash (66 characters, including '0x')
  block_number: number;         // Ethereum block number where the transaction was included
  timestamp: number;           // Timestamp of the transaction in UNIX format
  gas_used: string;             // Gas used by the transaction (as a string to preserve precision)
  gas_price: string;            // Gas price in wei (as a string to preserve large numbers)
  eth_fee: string;              // Gas fee in ETH (generated column)
  eth_price_at_tx: string;        // ETH price in USDT at the time of the transaction
  usdt_fee: string;             // Gas fee in USDT (generated column)
  processed_at: number;         // Timestamp when the transaction was processed (defaults to NOW)
}

export interface TransactionResponse {
  transactions: Transaction[]
  totalCount: number
  currentPage: number
  pageSize: number
}

export interface TransactionQueryParams {
  txHash: string;
  startTimestamp: number;
  endTimestamp: number;
  page: number;
  limit: number;
}