import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { CollectorsAlsoViewedSection } from '@/features/home/components/CollectorsAlsoViewedSection';
import { useCart } from '@/context/CartContext';

export const CartSection: React.FC = () => {
  const { cart, removeFromCart, addToCart, totalPrice, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');

  // Aumentar quantidade de um item no contexto
  const handleIncrement = (item: typeof cart[0]) => {
    addToCart({
      ...item,
      quantity: 1, // O addToCart soma 1 à quantidade existente
    });
  };

  // Diminuir quantidade de um item no contexto
  const handleDecrement = (item: typeof cart[0]) => {
    if (item.quantity > 1) {
      addToCart({
        ...item,
        quantity: -1, // Subtrai 1 da quantidade
      });
    } else {
      removeFromCart(item.id);
    }
  };

  // Cálculos dinâmicos
  const networkFee = 0.016;
  const subtotal = totalPrice;
  const total = subtotal > 0 ? subtotal + networkFee : 0;

  // Estado de carrinho vazio
  if (cart.length === 0) {
    return (
      <section className="w-full bg-[#140D0A] min-h-[70vh] flex items-center justify-center font-mono text-[#F3E5D8] px-6 py-16">
        <div className="max-w-md w-full bg-[#1A1510] border border-[#261E17] rounded-2xl p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-[#261E17] rounded-full flex items-center justify-center mx-auto text-[#D28A4C]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">
              Seu carrinho está vazio
            </h2>
            <p className="text-xs text-[#A89F91] leading-relaxed">
              Você ainda não adicionou nenhum NFT ao seu carrinho. Explore o mercado para encontrar artes exclusivas.
            </p>
          </div>
          <Link
            to="/"
            search={(prev) => ({ ...prev, view: 'mercado' })}
            className="inline-block w-full bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xs py-3.5 rounded-xl uppercase transition-all cursor-pointer"
          >
            Explorar Mercado
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#140D0A] max-w-[1440px] mx-auto px-6 py-8 font-mono text-[#F3E5D8]">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-xs text-[#A89F91]">
          <span>Início</span> <span className="mx-2">/</span>{' '}
          <span>Mercado</span> <span className="mx-2">/</span>{' '}
          <span className="text-[#D28A4C]">Carrinho</span>
        </div>
        
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-[#A89F91] hover:text-red-400 transition-colors cursor-pointer"
        >
          Esvaziar carrinho
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* ================= LADO ESQUERDO: LISTA DE NFTS (7 COLS) ================= */}
        <div className="lg:col-span-7 space-y-4">
          {/* Cabeçalho da Tabela */}
          <div className="grid grid-cols-12 text-xs font-bold text-[#A89F91] pb-2 border-b border-[#261E17]">
            <div className="col-span-5">NFTs</div>
            <div className="col-span-2 text-center">Preço</div>
            <div className="col-span-3 text-center">Edições</div>
            <div className="col-span-2 text-right pr-8">Total</div>
          </div>

          {/* Cards de Items do Contexto Dinâmico */}
          {cart.map((item) => {
            const itemTotal = (item.priceEth * item.quantity).toFixed(2);

            return (
              <div
                key={`${item.id}-${item.edition}`}
                className="bg-[#1A1510] border border-[#261E17] rounded-xl p-3 grid grid-cols-12 items-center gap-2"
              >
                {/* Thumbnail + Título + Edição */}
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#0F0C08]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-xs font-bold text-white truncate">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-[#A89F91] mt-0.5">
                      Edição: <span className="text-[#D28A4C]">{item.edition}</span>
                    </p>
                  </div>
                </div>

                {/* Preço Unitário */}
                <div className="col-span-2 text-center text-xs font-bold text-[#F3E5D8]">
                  {item.priceEth.toFixed(2)} ETH
                </div>

                {/* Seletor de Quantidade (+ e -) */}
                <div className="col-span-3 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecrement(item)}
                    className="w-6 h-9 rounded-xl bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  >
                    −
                  </button>
                  <span className="text-xs font-bold text-white min-w-[16px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleIncrement(item)}
                    className="w-6 h-9 rounded-xl bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  >
                    +
                  </button>
                </div>

                {/* Preço Total + Ícone Lixeira */}
                <div className="col-span-2 flex items-center justify-end gap-3">
                  <span className="text-xs font-bold text-[#D28A4C]">
                    {itemTotal} ETH
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remover item"
                    className="text-[#A89F91] hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= LADO DIREITO: RESUMO DA CARTEIRA (5 COLS) ================= */}
        <div className="lg:col-span-5 space-y-6 pl-0 lg:pl-6">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Resumo da carteira
          </h2>

          {/* Input de Código Promocional */}
          <div className="space-y-2">
            <label className="text-xs text-[#A89F91] block">
              Código promocional
            </label>
            <div className="flex items-center gap-0 border border-[#261E17] rounded-lg overflow-hidden bg-[#1A1510]">
              <input
                type="text"
                placeholder="Digite o código promocional..."
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-transparent text-xs text-white px-3 py-2.5 flex-1 outline-none placeholder-[#A89F91]/50 font-mono"
              />
              <button
                type="button"
                className="bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xs px-5 py-2.5 transition-all cursor-pointer uppercase"
              >
                Aplicar
              </button>
            </div>
          </div>

          {/* Tabela de Valores */}
          <div className="space-y-3 pt-2 text-xs">
            <div className="flex justify-between items-center text-[#A89F91]">
              <span>Subtotal</span>
              <span className="text-white font-bold">{subtotal.toFixed(2)} ETH</span>
            </div>

            <div className="flex justify-between items-center text-[#A89F91]">
              <span>Desconto do lançamento</span>
              <span className="text-[#A89F91]">(-) 00.00</span>
            </div>

            <div className="flex justify-between items-center text-[#A89F91]">
              <div>
                <span>Taxa de rede</span>
                <span className="block text-[10px] text-[#A89F91]/60">
                  Taxa estimada
                </span>
              </div>
              <span className="text-white font-bold">{networkFee} ETH</span>
            </div>

            <div className="border-t border-[#261E17] pt-4 flex justify-between items-center">
              <span className="font-bold text-white">Total</span>
              <span className="text-base font-bold text-[#D28A4C]">
                {total.toFixed(3)} ETH
              </span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3 pt-2">
            <Link
              to="/"
              search={(prev) => ({ ...prev, view: 'pagamento' })}
              className="w-full bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xs py-3.5 rounded-lg transition-all cursor-pointer uppercase active:scale-[0.99] text-center block"
            >
              Conectar e finalizar
            </Link>

            <Link
              to="/"
              search={(prev) => ({ ...prev, view: 'mercado' })}
              className="w-full text-center text-xs text-[#D28A4C] hover:underline cursor-pointer transition-all block"
            >
              Continuar explorando
            </Link>
          </div>
        </div>
      </div>

      <CollectorsAlsoViewedSection />
    </section>
  );
};