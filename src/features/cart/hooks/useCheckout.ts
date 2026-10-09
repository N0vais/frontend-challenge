import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { OrderPayload, OrderReceipt } from '@/types/order';

export function useCheckout() {
  const [idempotencyKey] = useState(() => `IDEM-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

  const processOrderMutation = useMutation<OrderReceipt, Error, Omit<OrderPayload, 'idempotencyKey'>>({
    mutationFn: async (payload) => {
      const response = await api.post<OrderReceipt>(
        '/orders',
        { ...payload, idempotencyKey },
        {
          headers: {
            'X-Idempotency-Key': idempotencyKey,
          },
        }
      );
      return response.data;
    },
  });

  return {
    idempotencyKey,
    processOrder: processOrderMutation.mutateAsync,
    isProcessing: processOrderMutation.isPending,
    error: processOrderMutation.error,
    receipt: processOrderMutation.data,
  };
}