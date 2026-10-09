import { http, HttpResponse } from 'msw';

// Dados simulados do catálogo de NFTs
const mockNFTs = [
  {
    id: '1',
    title: 'Cosmic Cyberpunk #01',
    description: 'Um artefato digital raro no universo cyberpunk.',
    priceEth: '1.25',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60',
    category: 'Art',
    availableQuantity: 3,
    isFavorited: false,
    creator: {
      name: 'Aether Lab',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60',
    },
  },
  {
    id: '2',
    title: 'Neon Samurai #04',
    description: 'Edição limitada do guerreiro neon.',
    priceEth: '0.85',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=60',
    category: 'Gaming',
    availableQuantity: 5,
    isFavorited: true,
    creator: {
      name: 'Cyber Studio',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60',
    },
  },
];

export const handlers = [
  // Listagem de NFTs com filtros
  http.get('/api/nfts', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';

    const filtered = mockNFTs.filter((nft) =>
      nft.title.toLowerCase().includes(search)
    );

    return HttpResponse.json(filtered);
  }),

  // Carrinho de compras
  http.get('/api/cart', () => {
    return HttpResponse.json([
      {
        nftId: '1',
        quantity: 1,
        nft: mockNFTs[0],
      },
    ]);
  }),

  // Cotação do carrinho
  http.post('/api/cart/quote', async ({ request }) => {
    const body = (await request.json()) as { couponCode?: string };
    const discount = body.couponCode === 'CRYPTO10' ? 0.1 : 0;

    return HttpResponse.json({
      subtotalEth: '1.25',
      discountEth: (1.25 * discount).toFixed(2),
      totalEth: (1.25 * (1 - discount)).toFixed(2),
      appliedCoupon: body.couponCode || null,
    });
  }),

  // Criar Pedido (Checkout com Idempotência)
  http.post('/api/orders', async ({ request }) => {
    const idempotencyKey = request.headers.get('X-Idempotency-Key');

    return HttpResponse.json(
      {
        orderId: `ORD-${Date.now()}`,
        status: 'CONFIRMED',
        idempotencyKey,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),
];