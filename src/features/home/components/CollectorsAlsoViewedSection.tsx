import React, { useState } from 'react';

// Importe as imagens dos NFTs do seu projeto
import heroMonkeyImage from '@/assets/monkey-hero.png';
import heroMonkeyBlue from '@/assets/monkey-blue.png';
import heroMonkeyBrow from '@/assets/monkey-brow.png';
import heroMonkeyBege from '@/assets/monkey-bege.png';

interface SuggestedNFT {
  id: string;
  title: string;
  price: string;
  image: string;
}

const SUGGESTED_NFTS: SuggestedNFT[] = [
  {
    id: '118',
    title: 'Cosmic Bloom #118',
    price: '1.29 ETH',
    image: heroMonkeyImage,
  },
  {
    id: '314',
    title: 'Violet Nomad #314',
    price: '1.39 ETH',
    image: heroMonkeyBlue,
  },
  {
    id: '088',
    title: 'Ivory Baron #088',
    price: '1.79 ETH',
    image: heroMonkeyBrow,
  },
  {
    id: '207',
    title: 'Golden Beat #207',
    price: '0.99 ETH',
    image: heroMonkeyBrow,
  },
  {
    id: '160',
    title: 'Golden Signal #160',
    price: '0.39 ETH',
    image: heroMonkeyBege,
  },
];

export const CollectorsAlsoViewedSection: React.FC = () => {
  const [activePageIndex, setActivePageIndex] = useState(1);

  return (
    <section className="w-full bg-[#140D0A] font-mono text-[#F3E5D8]">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        {/* Linha Divisória Superior + Título */}
        <div className="border-t border-[#261E17] pt-8 mb-8">
          <h2 className="text-[#D28A4C] text-sm sm:text-base font-bold tracking-wider uppercase">
            Colecionadores também viram
          </h2>
        </div>

        {/* Grid de 5 Colunas no Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
          {SUGGESTED_NFTS.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer flex flex-col justify-between"
            >
              {/* Card Interno com Foto Arredondada */}
              <div className="bg-[#1A1510] border border-[#261E17] rounded-[22px] p-2.5 transition-all duration-300 group-hover:border-[#3D3024] group-hover:scale-[1.02]">
                <div className="w-full aspect-square rounded-[18px] overflow-hidden bg-[#0F0C08]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Título e Preço */}
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

        {/* Paginação em Bolinhas (Dots) */}
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
                aria-label={`Página ${dotIndex + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};