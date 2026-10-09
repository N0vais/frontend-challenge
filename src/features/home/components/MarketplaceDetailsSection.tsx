

import React, { useState } from 'react';
import { useSearch } from '@tanstack/react-router';
import { MoreFromCollectionSection } from './MoreFromCollectionSection';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { MOCK_NFTS } from '@/data/nfts';

export const MarketplaceDetailsSection: React.FC = () => {
  // 1. Lê o ID da URL
  const searchParams = useSearch({ strict: false }) as { nftId?: string };
  const currentNftId = searchParams.nftId || 'emerald-ape-043';

  // 2. Busca o NFT atual no catálogo
  const currentNft =
    MOCK_NFTS.find((item) => item.id === currentNftId) || MOCK_NFTS[0];

  // 3. Padrão de Reset de Estado ao Mudar de NFT (sem useEffect)
  const [prevNftId, setPrevNftId] = useState(currentNftId);
  const [selectedImage, setSelectedImage] = useState(currentNft.image);
  const [selectedEdition, setSelectedEdition] = useState(currentNft.editions[0] || '1/50');
  const [quantity, setQuantity] = useState(1);

  // Se o ID do NFT mudou na URL durante o render, atualiza as seleções na hora:
  if (prevNftId !== currentNftId) {
    setPrevNftId(currentNftId);
    setSelectedImage(currentNft.image);
    setSelectedEdition(currentNft.editions[0] || '1/50');
    setQuantity(1);
  }

  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const active = isFavorite(currentNft.id);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleBuy = () => {
    addToCart({
      id: currentNft.id,
      title: currentNft.title,
      priceEth: currentNft.priceEth,
      image: selectedImage,
      edition: selectedEdition,
      quantity: quantity,
    });

    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const thumbnails = [
    currentNft.image,
    currentNft.image,
    currentNft.image,
    currentNft.image,
  ];

  return (
    <section className="w-full bg-[#140D0A] max-w-[1440px] mx-auto px-6 py-8 font-mono text-[#F3E5D8]">
      {/* Breadcrumb */}
      <div className="text-xs text-[#A89F91] mb-6">
        <span>Início</span> <span className="mx-2">/</span>{' '}
        <span className="text-[#D28A4C]">Mercado</span> <span className="mx-2">/</span>{' '}
        <span className="text-white">{currentNft.title}</span>
      </div>

      {/* Grid Superior */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Miniaturas */}
        <div className="lg:col-span-2 flex lg:flex-col gap-3 order-2 lg:order-1 overflow-x-auto pb-2 lg:pb-0">
          {thumbnails.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-full lg:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${selectedImage === img
                  ? 'border-[#D28A4C]'
                  : 'border-[#261E17] hover:border-[#3D3024]'
                }`}
            >
              <img
                src={img}
                alt={`Miniatura ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Imagem Principal */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="bg-[#1A1510] border border-[#261E17] rounded-[22px] overflow-hidden relative group">
            <img
              src={selectedImage}
              alt={currentNft.title}
              className="w-full aspect-square object-cover"
            />
          </div>
        </div>

        {/* Detalhes e Ações */}
        <div className="lg:col-span-5 order-3 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide mb-2">
              {currentNft.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xl font-bold text-[#D28A4C]">
                {currentNft.price}
              </span>
              <div className="flex items-center gap-1 text-xs text-[#A89F91]">
                <span className="text-[#D28A4C]">★★★★★</span>
                <span>19 avaliações de colecionadores</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Sobre este NFT:
            </h3>
            <p className="text-xs text-[#A89F91] font-sans leading-relaxed">
              {currentNft.description}
            </p>
          </div>

          {/* Seleção de Edição */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Edição:
            </h3>
            <div className="flex items-center gap-2">
              {currentNft.editions.map((ed) => (
                <button
                  key={ed}
                  type="button"
                  onClick={() => setSelectedEdition(ed)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${selectedEdition === ed
                      ? 'border-[#D28A4C] text-[#D28A4C] bg-[#D28A4C]/10'
                      : 'border-[#3D3024] text-[#A89F91] hover:border-[#D28A4C]'
                    }`}
                >
                  {ed}
                </button>
              ))}
            </div>
          </div>

          {/* Quantidade e Botões */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex items-center gap-3">
              {quantity > 1 && (
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="w-10 h-14 rounded-[20px] bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xl flex items-center justify-center transition-all cursor-pointer"
                >
                  −
                </button>
              )}

              <span className="text-white font-mono font-bold text-lg min-w-[24px] text-center px-1">
                {quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrement}
                className="w-10 h-14 rounded-[20px] bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xl flex items-center justify-center transition-all cursor-pointer"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-3 flex-1">
              <button
                type="button"
                onClick={handleBuy}
                className={`flex-1 font-bold text-xs py-3 rounded-lg transition-all cursor-pointer uppercase ${addedFeedback
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08]'
                  }`}
              >
                {addedFeedback ? 'ADICIONADO AO CARRINHO ✓' : 'COMPRAR'}
              </button>

              <button
                type="button"
                onClick={() => toggleFavorite(currentNft.id)}
                className={`flex items-center justify-center gap-2 border text-xs font-bold py-3 px-4 rounded-lg transition-all cursor-pointer ${active
                    ? 'border-[#D28A4C] bg-[#D28A4C]/10 text-[#D28A4C]'
                    : 'border-[#3D3024] text-[#F3E5D8]'
                  }`}
              >
                <span>{active ? 'Favoritado' : 'Favoritar'}</span>
              </button>
            </div>
          </div>

          {/* Metadados */}
          <div className="pt-4 border-t border-[#261E17] space-y-2 text-xs text-[#A89F91]">
            <p><strong className="text-white">ID do token:</strong> {currentNft.tokenId}</p>
            <p><strong className="text-white">Coleção:</strong> {currentNft.collection}</p>
          </div>
        </div>
      </div>

      {/* Abas e Recomendações */}
      <div className="border-t border-[#261E17] pt-8">
        <div className="flex items-center gap-8 border-b border-[#261E17] pb-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`text-sm font-bold cursor-pointer ${activeTab === 'details' ? 'text-[#D28A4C]' : 'text-[#A89F91]'
              }`}
          >
            Detalhes do NFT
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-bold cursor-pointer ${activeTab === 'reviews' ? 'text-[#D28A4C]' : 'text-[#A89F91]'
              }`}
          >
            Avaliações (19)
          </button>
        </div>

        {activeTab === 'details' ? (
          <div className="space-y-6 text-xs text-[#A89F91] font-sans leading-relaxed max-w-4xl">
            {/* Descrição principal dinâmica do card selecionado */}
            <p>
              <strong className="text-white font-mono">{currentNft.title}</strong> é uma obra digital {currentNft.edition} finalizada à mão da coleção <strong className="text-white font-mono">{currentNft.collection}</strong>. {currentNft.description}
            </p>

            <p>
              A propriedade inclui a arte em alta resolução, lançamentos exclusivos para colecionadores e um registro permanente de procedência registrada na rede Ethereum.
            </p>

            {/* Detalhes Técnicos Dinâmicos */}
            <div >
              <strong className="text-white font-mono block mb-1">Token ID:</strong>
                <p>Cunhado na Ethereum com procedência imutável e metadados armazenados no IPFS {currentNft.tokenId}</p>
            </div>

              <div>
                <strong className="text-white font-mono block mb-1">Contrato:</strong>
                <p>{currentNft.collection} Direitos autorais do criador: 5% nas vendas secundárias, pagos automaticamente pelos mercados compatíveis.</p>
              </div>

              <div>
                <strong className="text-white font-mono block mb-1">Preço Atual:</strong>
                <p className="text-[#D28A4C] font-mono font-bold">{currentNft.price} 0x7A42...19E0 • Contrato inteligente ERC-721 verificado.</p>
              </div>

              <div className="bg-[#1A1510] border border-[#261E17] rounded-xl p-4 space-y-1">
                <strong className="text-white font-mono block text-xs">Edição Selecionada:</strong>
                <p className="text-white font-mono">{selectedEdition}</p>
              </div>
            

            {/* Informações da Rede e do Contrato Inteligente */}
            <div className="space-y-3 pt-2">
              <div>
                <strong className="text-white font-mono block mb-1">Rede:</strong>
                <p>Cunhado na Ethereum Mainnet com procedência imutável e metadados armazenados no IPFS.</p>
              </div>

              <div>
                <strong className="text-white font-mono block mb-1">Contrato Inteligente:</strong>
                <p>Direitos autorais do criador: 5% nas vendas secundárias, pagos automaticamente por contratos ERC-721.</p>
              </div>

              <div>
                <strong className="text-white font-mono block mb-1">Endereço do Contrato:</strong>
                <p className="font-mono text-[11px] text-[#D28A4C]">0x7A42...19E0 • Contrato Inteligente ERC-721 Verificado</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs font-sans text-[#A89F91] py-4 max-w-4xl">
            <div className="flex items-center gap-2 text-[#D28A4C] font-bold text-sm">
              <span>★★★★★</span>
              <span className="text-white">4.9 / 5.0 (19 Avaliações)</span>
            </div>

            <div className="bg-[#1A1510] border border-[#261E17] rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-white font-bold">0x81B...3A91</span>
                <span className="text-[10px] text-[#A89F91]">Há 2 dias</span>
              </div>
              <p>Arte incrível! A qualidade da renderização e as cores da edição {currentNft.title} superaram as expectativas.</p>
            </div>

            <div className="bg-[#1A1510] border border-[#261E17] rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-white font-bold">crypto_collector.eth</span>
                <span className="text-[10px] text-[#A89F91]">Há 1 semana</span>
              </div>
              <p>Transação rápida na rede e excelente suporte para verificar a procedência do token.</p>
            </div>
          </div>
        )}

        <MoreFromCollectionSection />
      </div>
    </section>
  );
};