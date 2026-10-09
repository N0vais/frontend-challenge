import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { MOCK_NFTS, NFTItem } from '@/data/nfts';

export const MoreFromCollectionSection: React.FC = () => {
  const navigate = useNavigate();
  const [activePageIndex, setActivePageIndex] = useState(1);

  // 🟢 Função ajustada com 'as const' e tipagem estrita do TanStack Router
  const handleSelectNFT = (nft: NFTItem) => {
    navigate({
      to: '/',
      search: (old: { search?: string; category?: string; view?: string }) => ({
        ...old,
        view: 'mercado' as const, // 👈 'as const' informa ao TypeScript o valor exato
        nftId: nft.id,
      }),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[#140D0A] max-w-[1440px] mx-auto px-6 py-12 font-mono text-[#F3E5D8]">
      {/* Título da Seção + Linha Separadora */}
      <div className="border-t border-[#261E17] pt-8 mb-8">
        <h2 className="text-[#D28A4C] text-sm sm:text-base font-bold tracking-wider uppercase">
          Mais desta coleção
        </h2>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
        {MOCK_NFTS.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelectNFT(item)}
            className="group cursor-pointer flex flex-col justify-between"
          >
            {/* Card com Foto Arredondada */}
            <div className="bg-[#1A1510] border border-[#261E17] rounded-[22px] p-2.5 transition-all duration-300 group-hover:border-[#D28A4C]/60 group-hover:scale-[1.02]">
              <div className="w-full aspect-square rounded-[18px] overflow-hidden bg-[#0F0C08]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Informações do NFT */}
            <div className="mt-3 px-1 space-y-1">
              <h3 className="text-xs sm:text-sm font-bold text-[#F3E5D8] group-hover:text-[#D28A4C] transition-colors truncate">
                {item.title}
              </h3>
              <p className="text-xs font-bold text-[#D28A4C]">
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de Paginação em Bolinhas (Dots) */}
      <div className="flex justify-center items-center gap-2 pt-2">
        {[0, 1, 2].map((dotIndex) => {
          const isActive = activePageIndex === dotIndex;
          return (
            <button
              key={dotIndex}
              onClick={() => setActivePageIndex(dotIndex)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#D28A4C] border-[#D28A4C]'
                  : 'bg-transparent border-[#3D3024] hover:border-[#D28A4C]'
              }`}
              aria-label={`Ir para a página ${dotIndex + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
};