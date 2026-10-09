export interface OrderItem {
  nftId: string;
  quantity: number;
  priceEth: string;
}

export interface OrderPayload {
  items: OrderItem[];
  couponCode?: string;
  paymentMethod: 'CRYPTO_WALLET' | 'CREDIT_CARD';
  walletAddress?: string;
  idempotencyKey: string;
}

export interface OrderReceipt {
  orderId: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  totalEth: string;
  idempotencyKey: string;
  createdAt: string;
  transactionHash?: string;
}