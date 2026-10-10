import React from 'react';
import { NFTFilters } from '@/types/nft';

interface NFTCatalogProps {
  filters: NFTFilters;
  onFilterChange: (newFilters: Partial<NFTFilters>) => void;
}

export const NFTCatalog: React.FC<NFTCatalogProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="p-6 text-[#F3E5D8] bg-[#0F0C08] min-h-screen">
      <h1 className="text-2xl font-bold text-[#D4A373] mb-4">Catálogo de NFTs</h1>

      {/* Campo de Busca de Teste */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar NFTs..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="bg-[#1A1510] border border-[#3D3024] p-2 rounded text-[#F3E5D8] focus:outline-none focus:border-[#D4A373]"
        />
      </div>

      <p className="text-[#A89F91]">
        Filtro de busca atual: <strong className="text-white">{filters.search || 'Nenhum'}</strong>
      </p>
    </div>
  );
};