import React, { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';

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
}

const ALL_NFTS: NFTItem[] = [
  { id: '1', title: 'Emerald Ape #042', category: 'Arte digital', network: 'Ethereum', priceEth: 1.45, image: heroMonkeyImage },
  { id: '2', title: 'Sage Nomad #009', category: 'Arte 3D', network: 'Ethereum', priceEth: 1.69, image: heroMonkeyBlue },
  { id: '3', title: 'Neon Vessel #552', category: 'Generativa', network: 'Polygon', priceEth: 1.99, originalPriceEth: 2.29, image: heroMonkeyBege },
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevant');

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

  // BOTÃO APLICAR: Sincroniza a faixa de preço e redes/categorias selecionadas
  const handleApplyFilter = () => {
    setAppliedFilters({
      min: minPrice,
      max: maxPrice,
      category: selectedCategory,
      network: selectedNetwork,
    });
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

  // Filtragem e Ordenação dos NFTs em tempo real
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

  // Cálculos de porcentagem da barra de faixa de preço
  const minPercent = ((minPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100;
  const maxPercent = ((maxPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100;

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-8 font-mono">
      {/* Flex layout com gap expansivo */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* ================= BARRA LATERAL (FILTROS) ================= */}
        <aside className="w-full lg:w-[290px] shrink-0 space-y-8 p-6 bg-[#241612] border border-[#3D3024] rounded-2xl">
          
          {(selectedCategory || selectedNetwork || appliedFilters.min !== MIN_LIMIT || appliedFilters.max !== MAX_LIMIT || searchQuery) && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#D4A373] font-bold">Filtros Ativos</span>
              <button
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
                      onClick={() => handleSelectCategory(catName)}
                      className={`w-full flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
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
              onClick={handleApplyFilter}
              className="bg-[#D4A373] hover:bg-[#E5B484] text-[#0F0C08] text-xs font-bold px-4 py-1.5 rounded-lg transition-all uppercase active:scale-95 cursor-pointer"
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
                      onClick={() => handleSelectNetwork(netName)}
                      className={`w-full flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
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

        </aside>

        {/* ================= ÁREA PRINCIPAL DA GRELHA ================= */}
        <main className="flex-1 w-full space-y-6">
          {/* Topo da Grelha: Busca e Ordenação */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-[#261E17]">
            {/* Input de Busca */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Buscar por nome do NFT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] focus:border-[#D4A373] text-[#F3E5D8] px-4 py-2.5 rounded-xl outline-none placeholder-[#A89F91]/50 text-xs transition-colors font-mono"
              />
              <svg
                className="w-4 h-4 text-[#A89F91] absolute right-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Select de Ordenação */}
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

          {/* Grelha de NFTs (3 Colunas) */}
          {filteredNfts.length === 0 ? (
            <div className="bg-[#1A1510] border border-[#3D3024] rounded-2xl p-12 text-center text-[#A89F91] text-sm">
              Nenhum NFT encontrado para os filtros selecionados.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredNfts.map((nft) => (
                <Link
                  key={nft.id}
                  to="/"
                  search={(prev) => ({
                    ...prev,
                    view: 'mercado',
                    id: nft.id,
                  })}
                  className="group cursor-pointer block"
                >
                  <div className="bg-[#1A1510] aspect-square rounded-[1.25rem] overflow-hidden mb-3 border border-transparent group-hover:border-[#3D3024] transition-all relative">
                    <img
                      src={nft.image}
                      alt={nft.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h4 className="text-xs font-semibold text-[#F3E5D8] mb-1 group-hover:text-[#D4A373] transition-colors truncate">
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
                </Link>
              ))}
            </div>
          )}
        </main>

      </div>
    </section>
  );
};


































