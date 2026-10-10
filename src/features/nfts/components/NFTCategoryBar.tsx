import React from 'react';
import { NFTFilters } from '@/types/nft';

interface NFTCategoryBarProps {
  filters: NFTFilters;
  onFilterChange: (newFilters: Partial<NFTFilters>) => void;
}

export const NFTCategoryBar: React.FC<NFTCategoryBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className=" hidden lg:flex border-t border-[#261E17] pt-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Abas Esquerda */}
      <div className="flex items-center gap-6 overflow-x-auto pb-2 sm:pb-0 text-sm font-medium">
        <button
          onClick={() => onFilterChange({ category: undefined })}
          className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${!filters.category
              ? 'border-[#D4A373] text-[#F3E5D8] font-bold'
              : 'border-transparent text-[#A89F91] hover:text-[#F3E5D8]'
            }`}
        >
          Todos os NFTs
        </button>
        <button
          onClick={() => onFilterChange({ category: 'Novos' })}
          className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${filters.category === 'Novos'
              ? 'border-[#D4A373] text-[#F3E5D8] font-bold'
              : 'border-transparent text-[#A89F91] hover:text-[#F3E5D8]'
            }`}
        >
          Novos lançamentos
        </button>
        <button
          onClick={() => onFilterChange({ category: 'Em alta' })}
          className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${filters.category === 'Em alta'
              ? 'border-[#D4A373] text-[#F3E5D8] font-bold'
              : 'border-transparent text-[#A89F91] hover:text-[#F3E5D8]'
            }`}
        >
          Em alta
        </button>
      </div>

      {/* Ordenação Direita */}
      <div className="flex items-center gap-2 text-xs text-[#A89F91]">
        <span>Ordenar por:</span>
        <select
          value={filters.sortBy || 'recent'}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as NFTFilters['sortBy'] })}
          className="bg-transparent text-[#F3E5D8] font-semibold focus:outline-none cursor-pointer"
        >
          <option value="recent" className="bg-[#1A1510]">Listados recentemente</option>
          <option value="price_asc" className="bg-[#1A1510]">Menor Preço</option>
          <option value="price_desc" className="bg-[#1A1510]">Maior Preço</option>
        </select>
      </div>
    </div>
  );
};