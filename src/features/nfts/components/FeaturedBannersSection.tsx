import React, { useState } from 'react';

// Importe as imagens do seu projeto (Vite optimization)
import monkeyHeroImg from '@/assets/monkey-hero.png';
import monkeyBlueImg from '@/assets/monkey-blue.png';

interface BannerData {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

const BANNERS_DATA: BannerData[] = [
  {
    id: 1,
    title: 'Lançamentos gênesis\nde edição limitada',
    description: 'Colecione edições escassas diretamente dos criadores antes da revelação pública.',
    image: monkeyHeroImg,
    buttonText: 'Explorar',
  },
  {
    id: 2,
    title: 'Arte digital selecionada\ne muito mais',
    description: 'Explore novos artistas, coleções verificadas e obras digitais que definem a cultura.',
    image: monkeyBlueImg,
    buttonText: 'Explorar',
  },
];

export const FeaturedBannersSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 4;

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-10 font-mono">
      {/* Controles de Paginação (Topo Direito) */}
      <div className="flex justify-end items-center gap-2 mb-6">
        {[1, 2, 3, 4].map((page) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${isActive
                  ? 'bg-[#D28A4C] text-[#0F0C08]'
                  : 'bg-[#1A1510] text-[#A89F91] border border-[#261E17] hover:border-[#D28A4C] hover:text-[#F3E5D8]'
                }`}
            >
              {page}
            </button>
          );
        })}

        {/* Botão Próximo (Seta) */}
        <button
          onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1))}
          className="w-8 h-8 rounded-md bg-[#1A1510] text-[#A89F91] border border-[#261E17] hover:border-[#D28A4C] hover:text-[#F3E5D8] transition-all cursor-pointer flex items-center justify-center text-xs"
          aria-label="Próxima página"
        >
          &gt;
        </button>
      </div>

      {/* Grid com os 2 Banners Lado a Lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {BANNERS_DATA.map((banner) => (
          <div
            key={banner.id}
            className="bg-[#1A1510] border border-[#261E17] rounded-[22px] overflow-hidden flex flex-col sm:flex-row items-stretch relative group transition-all duration-300 hover:border-[#3D3024]"
          >
            {/* Lado Esquerdo: Imagem com cantos arredondados */}
            <div className="w-full sm:w-1/2 relative overflow-hidden min-h-[260px] sm:min-h-[280px]">
              <img
                src={banner.image}
                alt={banner.title.replace('\n', ' ')}
                className="w-full h-full object-cover rounded-[22px] transition-transform duration-500 group-hover:scale-105"
              />
              {/* Detalhe de linha dourada abstrata sutil no canto da foto */}
              <svg
                className="absolute bottom-0 left-0 w-24 h-24 text-[#D28A4C]/30 pointer-events-none"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path d="M0 100C30 80 60 85 100 0" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Lado Direito: Conteúdo de Texto Alinhado à Direita */}
            <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between items-end text-right">
              <div>
                {/* Título com quebra de linha estilizada */}
                <h3 className="text-white text-base sm:text-lg font-bold leading-tight mb-4 tracking-wide whitespace-pre-line">
                  {banner.title}
                </h3>

                {/* Descrição */}
                <p className="text-[#A89F91] text-xs sm:text-[13px] leading-relaxed mb-6 font-sans">
                  {banner.description}
                </p>
              </div>

              {/* Botão Explorar com Seta */}
              <button className="bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-mono font-bold text-xs px-5 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95">
                <span>{banner.buttonText}</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

