import React, { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import heroMonkeyImage from '@/assets/monkey-hero.png';
import heroMonkeyBlue from '@/assets/monkey-blue.png';
import heroMonkeyBrow from '@/assets/monkey-brow.png';
import heroMonkeyBege from '@/assets/monkey-bege.png';

interface NFTItem {
  id: string;
  title: string;
  category: string;
  network: string;
  priceEth: number;
  originalPriceEth?: number;
  image: string;
  isRare?: boolean;
}

const ALL_NFTS: NFTItem[] = [
  { id: '1', title: 'Emerald Ape #042', category: 'Arte digital', network: 'Ethereum', priceEth: 1.19, image: heroMonkeyImage },
  { id: '2', title: 'Sage Nomad #009', category: 'Arte 3D', network: 'Ethereum', priceEth: 1.69, image: heroMonkeyBlue },
  { id: '3', title: 'Neon Vessel #552', category: 'Generativa', network: 'Polygon', priceEth: 1.99, originalPriceEth: 2.29, image: heroMonkeyBege, isRare: true },
  { id: '4', title: 'Cosmic Bloom #118', category: 'Arte digital', network: 'Solana', priceEth: 1.29, image: heroMonkeyBlue },
  { id: '5', title: 'Violet Nomad #314', category: 'Colecionáveis', network: 'Ethereum', priceEth: 1.39, image: heroMonkeyBlue },
  { id: '6', title: 'Ivory Baron #088', category: 'Jogos', network: 'Polygon', priceEth: 1.79, image: heroMonkeyBege },
  { id: '7', title: 'Golden Beat #207', category: 'Música', network: 'Ethereum', priceEth: 0.99, image: heroMonkeyBrow },
  { id: '8', title: 'Golden Signal #160', category: 'Utilidade', network: 'Solana', priceEth: 0.39, image: heroMonkeyBrow },
  { id: '9', title: 'Golden Beat #207', category: 'Música', network: 'Ethereum', priceEth: 0.99, image: heroMonkeyBrow },
  { id: '10', title: 'Violet Nomad #314', category: 'Assinaturas', network: 'Ethereum', priceEth: 11.39, image: heroMonkeyBlue },
  { id: '11', title: 'Ivory Baron #088', category: 'Jogos', network: 'Polygon', priceEth: 12.38, image: heroMonkeyBege },
  { id: '12', title: 'Golden Beat #207', category: 'Fotografia', network: 'Ethereum', priceEth: 5.99, image: heroMonkeyBrow },
];

const CATEGORY_NAMES = [
  'Arte digital',
  'Fotografia',
  'Música',
  'Arte 3D',
  'Colecionáveis',
  'Generativa',
  'Jogos',
  'Assinaturas',
  'Utilidade',
];

const NETWORK_NAMES = ['Ethereum', 'Polygon', 'Solana'];

export const MarketplaceSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevant');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const MIN_LIMIT = 0.02;
  const MAX_LIMIT = 12.38;

  const [minPrice, setMinPrice] = useState<number>(MIN_LIMIT);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_LIMIT);

  // Filtros aplicados à busca
  const [appliedFilters, setAppliedFilters] = useState({
    min: MIN_LIMIT,
    max: MAX_LIMIT,
    category: null as string | null,
    network: null as string | null,
  });

  // Toggle de Favoritos sem redirecionar
  const toggleFavorite = (e: React.MouseEvent, nftId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(nftId)) {
        next.delete(nftId);
      } else {
        next.add(nftId);
      }
      return next;
    });
  };

  // Navegar para a tela do mercado com o NFT selecionado
  const handleCardClick = (nftId: string) => {
    navigate({
      to: '/',
      search: (prev: Record<string, unknown>) =>
        ({
          ...prev,
          view: 'mercado',
          id: nftId,
        }) as unknown as Record<string, string | undefined>,
    });
  };

  // Contadores dinâmicos
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORY_NAMES.forEach((cat) => (counts[cat] = 0));
    ALL_NFTS.forEach((nft) => {
      if (counts[nft.category] !== undefined) counts[nft.category] += 1;
    });
    return counts;
  }, []);

  const networkCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    NETWORK_NAMES.forEach((net) => (counts[net] = 0));
    ALL_NFTS.forEach((nft) => {
      if (counts[nft.network] !== undefined) counts[nft.network] += 1;
    });
    return counts;
  }, []);

  const handleApplyFilter = () => {
    setAppliedFilters({
      min: minPrice,
      max: maxPrice,
      category: selectedCategory,
      network: selectedNetwork,
    });
    setIsMobileFilterOpen(false);
  };

  const handleSelectCategory = (catName: string) => {
    const nextCat = selectedCategory === catName ? null : catName;
    setSelectedCategory(nextCat);
    setAppliedFilters((prev) => ({ ...prev, category: nextCat }));
  };

  const handleSelectNetwork = (netName: string) => {
    const nextNet = selectedNetwork === netName ? null : netName;
    setSelectedNetwork(nextNet);
    setAppliedFilters((prev) => ({ ...prev, network: nextNet }));
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedNetwork(null);
    setMinPrice(MIN_LIMIT);
    setMaxPrice(MAX_LIMIT);
    setSearchQuery('');
    setAppliedFilters({
      min: MIN_LIMIT,
      max: MAX_LIMIT,
      category: null,
      network: null,
    });
  };

  // Filtragem e Ordenação dos NFTs
  const filteredNfts = useMemo(() => {
    return ALL_NFTS.filter((nft) => {
      const matchPrice = nft.priceEth >= appliedFilters.min && nft.priceEth <= appliedFilters.max;
      const matchCategory = !appliedFilters.category || nft.category === appliedFilters.category;
      const matchNetwork = !appliedFilters.network || nft.network === appliedFilters.network;
      const matchSearch = nft.title.toLowerCase().includes(searchQuery.toLowerCase());

      return matchPrice && matchCategory && matchNetwork && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEth - b.priceEth;
      if (sortBy === 'price-desc') return b.priceEth - a.priceEth;
      return 0;
    });
  }, [appliedFilters, searchQuery, sortBy]);

  // Porcentagem da faixa de preço
  const minPercent = ((minPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100;
  const maxPercent = ((maxPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100;

  // Renderizador do Conteúdo dos Filtros (Reutilizado entre Sidebar Desktop e Modal Mobile)
  const renderFilterContent = () => (
    <>
      {(selectedCategory || selectedNetwork || appliedFilters.min !== MIN_LIMIT || appliedFilters.max !== MAX_LIMIT || searchQuery) && (
        <div className="flex justify-between items-center text-xs">
          <span className="text-[#D4A373] font-bold">Filtros Ativos</span>
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-[#A89F91] hover:text-white underline cursor-pointer"
          >
            Limpar todos
          </button>
        </div>
      )}

      {/* 1. Coleções */}
      <div>
        <h3 className="text-sm font-bold text-[#F3E5D8] mb-4 tracking-wide">
          Coleções
        </h3>
        <ul className="space-y-2.5 text-xs">
          {CATEGORY_NAMES.map((catName) => {
            const count = categoryCounts[catName] || 0;
            const isSelected = selectedCategory === catName;

            return (
              <li key={catName}>
                <button
                  type="button"
                  onClick={() => handleSelectCategory(catName)}
                  className={`w-full flex items-center justify-between transition-colors cursor-pointer ${isSelected
                    ? 'text-[#D4A373] font-bold'
                    : 'text-[#A89F91] hover:text-[#F3E5D8]'
                    }`}
                >
                  <span>{catName}</span>
                  <span className="text-[#6E6458]">({count})</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2. Faixa de Preço */}
      <div className="pt-2 border-t border-[#261E17]">
        <h3 className="text-sm font-bold text-[#F3E5D8] mb-4 tracking-wide">
          Faixa de preço
        </h3>

        <div className="relative my-6 h-4 flex items-center">
          <div className="h-1 bg-[#261E17] rounded-full w-full relative">
            <div
              className="absolute top-0 bottom-0 bg-[#D4A373] rounded-full"
              style={{
                left: `${minPercent}%`,
                right: `${100 - maxPercent}%`,
              }}
            />
          </div>

          <input
            type="range"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            step="0.05"
            value={minPrice}
            onChange={(e) => setMinPrice(Math.min(parseFloat(e.target.value), maxPrice - 0.1))}
            className="absolute w-full opacity-0 cursor-pointer h-4 z-20"
          />

          <input
            type="range"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            step="0.05"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Math.max(parseFloat(e.target.value), minPrice + 0.1))}
            className="absolute w-full opacity-0 cursor-pointer h-4 z-20"
          />

          <div
            className="absolute w-4 h-4 bg-[#D4A373] border-2 border-[#0F0C08] rounded-full pointer-events-none z-10"
            style={{ left: `calc(${minPercent}% - 8px)` }}
          />
          <div
            className="absolute w-4 h-4 bg-[#D4A373] border-2 border-[#0F0C08] rounded-full pointer-events-none z-10"
            style={{ left: `calc(${maxPercent}% - 8px)` }}
          />
        </div>

        <div className="text-[11px] text-[#A89F91] mb-3">
          Preço: <span className="text-[#F3E5D8] font-mono">{minPrice.toFixed(2)} - {maxPrice.toFixed(2)} ETH</span>
        </div>

        <button
          type="button"
          onClick={handleApplyFilter}
          className="bg-[#D4A373] hover:bg-[#E5B484] text-[#0F0C08] text-xs font-bold px-4 py-1.5 rounded-lg transition-all uppercase active:scale-95 cursor-pointer w-full lg:w-auto"
        >
          Aplicar
        </button>
      </div>

      {/* 3. Rede */}
      <div className="pt-2 border-t border-[#261E17]">
        <h3 className="text-sm font-bold text-[#F3E5D8] mb-4 tracking-wide">
          Rede
        </h3>
        <ul className="space-y-2.5 text-xs">
          {NETWORK_NAMES.map((netName) => {
            const count = networkCounts[netName] || 0;
            const isSelected = selectedNetwork === netName;

            return (
              <li key={netName}>
                <button
                  type="button"
                  onClick={() => handleSelectNetwork(netName)}
                  className={`w-full flex items-center justify-between transition-colors cursor-pointer ${isSelected
                    ? 'text-[#D4A373] font-bold'
                    : 'text-[#A89F91] hover:text-[#F3E5D8]'
                    }`}
                >
                  <span>{netName}</span>
                  <span className="text-[#6E6458]">({count})</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 4. NFT em Destaque */}
      <div className="pt-2 border-t border-[#261E17]">
        <div className="text-xs font-bold tracking-widest text-[#D4A373] uppercase mb-1">
          NFT EM DESTAQUE
        </div>
        <div className="text-xs font-bold text-[#F3E5D8] uppercase tracking-wider mb-3">
          OFERTA LIMITADA
        </div>
        <div
          className="relative group overflow-hidden border border-[#3D3024] bg-[#1A1510] transition-transform duration-500 hover:scale-[1.02]"
          style={{
            width: '100%',
            height: '368px',
            borderRadius: '22px',
          }}
        >
          <img
            src={heroMonkeyImage}
            alt="NFT em Destaque"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </>
  );

  return (
    <section className="max-w-[1440px] bg-[#140D0A] mx-auto px-4 sm:px-6 py-4 sm:py-8 font-mono">

      {/* ABAS DE CATEGORIA (MOBILE ONLY) */}
      <div className="flex lg:hidden items-center gap-6 text-xs font-mono border-b border-[#261E17]/50 pb-2 mb-6 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => handleSelectCategory('Arte digital')}
          className={`pb-2 -mb-2 whitespace-nowrap ${!selectedCategory || selectedCategory === 'Arte digital'
            ? 'text-[#D28A4C] font-bold border-b-2 border-[#D28A4C]'
            : 'text-[#A89F91]'
            }`}
        >
          Todos os NFTs
        </button>
        <button
          type="button"
          onClick={() => handleSelectCategory('Generativa')}
          className={`pb-2 whitespace-nowrap ${selectedCategory === 'Generativa' ? 'text-[#D28A4C] font-bold border-b-2 border-[#D28A4C]' : 'text-[#A89F91]'
            }`}
        >
          Novos lançamentos
        </button>
        <button
          type="button"
          onClick={() => handleSelectCategory('Colecionáveis')}
          className={`pb-2 whitespace-nowrap ${selectedCategory === 'Colecionáveis' ? 'text-[#D28A4C] font-bold border-b-2 border-[#D28A4C]' : 'text-[#A89F91]'
            }`}
        >
          Em alta
        </button>
      </div>

      {/* Layout com Flexbox/Grid */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">

        {/* BARRA LATERAL DESKTOP  */}
        <aside className="hidden lg:block w-[290px] shrink-0 space-y-8 p-6 bg-[#241612] border border-[#3D3024] rounded-2xl">
          {renderFilterContent()}
        </aside>

        {/* ÁREA PRINCIPAL DA GRELHA  */}
        <main className="flex-1 w-full space-y-6">

          <div className="hidden lg:flex flex-row items-center justify-between gap-4 pb-4 border-b border-[#261E17]">
            <div className="relative flex-1 max-w-md">

              {/* ABAS DE CATEGORIA CONECTADAS AO ESTADO DO SEU FILTRO */}
              <div className="flex items-center gap-6 overflow-x-auto pb-2 sm:pb-0 text-sm font-medium no-scrollbar">

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(null);
                    setAppliedFilters((prev) => ({ ...prev, category: null }));
                  }}
                  className={`pb-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${!appliedFilters.category && !selectedCategory
                    ? 'border-[#D4A373] text-[#F3E5D8] font-bold'
                    : 'border-transparent text-[#A89F91] hover:text-[#F3E5D8]'
                    }`}
                >
                  Todos os NFTs
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectCategory('Generativa')} // Ou a categoria desejada do seu array
                  className={`pb-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${selectedCategory === 'Generativa' || appliedFilters.category === 'Generativa'
                    ? 'border-[#D4A373] text-[#F3E5D8] font-bold'
                    : 'border-transparent text-[#A89F91] hover:text-[#F3E5D8]'
                    }`}
                >
                  Novos lançamentos
                </button>

                {/* Botão: Em alta */}
                <button
                  type="button"
                  onClick={() => handleSelectCategory('Colecionáveis')} // Ou a categoria desejada do seu array
                  className={`pb-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${selectedCategory === 'Colecionáveis' || appliedFilters.category === 'Colecionáveis'
                    ? 'border-[#D4A373] text-[#F3E5D8] font-bold'
                    : 'border-transparent text-[#A89F91] hover:text-[#F3E5D8]'
                    }`}
                >
                  Em alta
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#A89F91]">
              <span>Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#1A1510] border border-[#261E17] focus:border-[#D4A373] text-[#F3E5D8] px-3 py-2 rounded-xl outline-none cursor-pointer font-mono"
              >
                <option value="relevant">Mais Relevantes</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
              </select>
            </div>
          </div>

          {/* Grelha de NFTs (2 Colunas no Mobile, 3 Colunas no Desktop) */}
          {filteredNfts.length === 0 ? (
            <div className="bg-[#1A1510] border border-[#3D3024] rounded-2xl p-12 text-center text-[#A89F91] text-sm">
              Nenhum NFT encontrado para os filtros selecionados.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 pb-24 lg:pb-0">
              {filteredNfts.map((nft) => {
                const isFav = favorites.has(nft.id);

                return (
                  <div
                    key={nft.id}
                    onClick={() => handleCardClick(nft.id)}
                    className="group cursor-pointer block text-left"
                  >
                    <div className="bg-[#1A1510] aspect-square rounded-[1.25rem] overflow-hidden mb-2 sm:mb-3 border border-transparent group-hover:border-[#3D3024] transition-all relative">
                      <img
                        src={nft.image}
                        alt={nft.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Tag de Raridade no Mobile */}
                      {nft.isRare && (
                        <span className="absolute top-2 left-0 bg-[#D28A4C] text-[#0F0C08] text-[9px] font-bold px-2 py-0.5 uppercase rounded-r-md">
                          RARO
                        </span>
                      )}

                      {/* Botão de Favoritar (Coração) */}
                      <button
                        type="button"
                        aria-label="Favoritar"
                        onClick={(e) => toggleFavorite(e, nft.id)}
                        className={`absolute top-2 right-2 w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${isFav
                          ? 'bg-[#D28A4C] text-[#0F0C08]'
                          : 'bg-[#0F0C08]/60 text-white/80 hover:text-[#D28A4C]'
                          }`}
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill={isFav ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>

                    <h4 className="text-xs font-semibold text-[#F3E5D8] mb-0.5 group-hover:text-[#D4A373] transition-colors truncate">
                      {nft.title}
                    </h4>

                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="text-[#D4A373]">{nft.priceEth.toFixed(2)} ETH</span>
                      {nft.originalPriceEth && (
                        <span className="text-[#6E6458] line-through font-normal text-[11px]">
                          {nft.originalPriceEth.toFixed(2)} ETH
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

      </div>

      {/* MODAL DRAWER DE FILTROS MOBILE */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-[#241612] h-full p-6 overflow-y-auto space-y-6 border-l border-[#3D3024]">
            <div className="flex items-center justify-between border-b border-[#3D3024] pb-4">
              <h2 className="text-sm font-bold text-white uppercase">Filtros</h2>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-[#A89F91] hover:text-white"
              >
                ✕
              </button>
            </div>
            {renderFilterContent()}
          </div>
        </div>
      )}

    </section>
  );
};