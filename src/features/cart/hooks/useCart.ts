import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { CartItem, QuoteResponse } from '@/types/cart';

export function useCart() {
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ['cart-items'],
    queryFn: async () => {
      const res = await api.get('/cart');
      return res.data;
    },
  });

  const getQuote = async (couponCode?: string): Promise<QuoteResponse> => {
    const payload = {
      items: items.map((item) => ({ nftId: item.nftId, quantity: item.quantity })),
      couponCode,
    };
    const res = await api.post<QuoteResponse>('/cart/quote', payload);
    return res.data;
  };

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ nftId, quantity }: { nftId: string; quantity: number }) => {
      await api.patch(`/cart/items/${nftId}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      queryClient.invalidateQueries({ queryKey: ['cart-quote'] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (nftId: string) => {
      await api.delete(`/cart/items/${nftId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      queryClient.invalidateQueries({ queryKey: ['cart-quote'] });
    },
  });

  return {
    items,
    isLoading,
    getQuote,
    updateQuantity: updateQuantityMutation.mutate,
    removeItem: removeItemMutation.mutate,
  };
}