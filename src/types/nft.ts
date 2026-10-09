// src/types/nft.ts
export interface NFTFilters {
  search?: string;
  category?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'recent';
  page?: number;
  minPrice?: string;
  maxPrice?: string;
  view?: 'home' | 'mercado' | 'carrinho' | 'pagamento'| 'perfil'; // 👈 Adicionado
}