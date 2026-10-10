import React from 'react';
import heroMonkeyImage from '@/assets/monkey-hero.png';
import heroMonkeyBlue from '@/assets/monkey-blue.png';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onOpenFilter?: () => void;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenFilter,
  searchValue = '',
  onSearchChange,
}) => {
  return (
    <section className="py-2 sm:py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 bg-[#140D0A]">

      {/* TOPO MOBILE EXATO DA IMAGEM (< lg) */}
      <div className="lg:hidden space-y-4">

        {/*  Barra Superior de Busca + Botão Filtro */}
        <div className="flex items-center gap-3 w-full">
          {/* Input de busca estilizado */}
          <div className="flex-1 flex items-center bg-[#1F1713] border border-[#261E17] rounded-2xl px-4 py-3">
            <svg className="w-4 h-4 text-[#A89F91] mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Explorar coleções"
              value={searchValue}
              onChange={onSearchChange}
              className="bg-transparent text-xs text-[#F3E5D8] placeholder-[#A89F91]/70 outline-none w-full font-mono"
            />
          </div>

          {/* Botão de Filtro Âmbar */}
          <button
            type="button"
            onClick={onOpenFilter}
            aria-label="Abrir Filtros"
            className="w-12 h-12 bg-[#D28A4C] text-[#0F0C08] rounded-2xl flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 010 4m-6 8a2 2 0 100-4m0 4a2 2 0 010-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 010-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>

        {/* Card Hero em Marrom com Gradiente / Ellipse */}
        <div className="bg-[#5C3D22]/80 border border-[#4A321B] rounded-3xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between gap-2 relative z-10">

            {/* Lado Esquerdo: Textos */}
            <div className="flex-1 space-y-2">
              <span className="text-[10px] text-[#F3E5D8]/80 uppercase tracking-wider block font-mono">
                Bem-vindo à Kurio
              </span>
              <h2 className="text-xs font-bold text-white uppercase leading-snug font-mono">
                SEJA DONO DA CULTURA DIGITAL
              </h2>
              <p className="text-[10px] text-[#F3E5D8]/70 line-clamp-3 leading-relaxed font-mono">
                Descubra NFTs selecionados de criadores do mundo todo.
              </p>
              <button
                type="button"
                onClick={onExploreClick}
                className="text-[11px] font-bold text-[#E5B484] flex items-center gap-1 uppercase pt-1 font-mono cursor-pointer"
              >
                EXPLORAR <span className="text-xs">→</span>
              </button>
            </div>

            {/* Lado Direito: NFT + Criador Sobreposto */}
            <div className="relative w-28 h-28 shrink-0">
              <img
                src={heroMonkeyImage}
                alt="NFT Destaque"
                className="w-full h-full object-cover rounded-2xl border border-[#3D2817]"
              />
              <div className="absolute -bottom-1 -left-2 w-10 h-10 rounded-xl overflow-hidden border-2 border-[#5C3D22] shadow-md">
                <img
                  src={heroMonkeyBlue}
                  alt="Criador"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Indicadores de Slide (3 Pontos) */}
          <div className="flex justify-center items-center gap-1.5 mt-3 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B484]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D2817]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D2817]" />
          </div>
        </div>

      </div>

      {/* DESKTOP (Inalterado, exibe apenas em telas >= lg) */}
      <div className="hidden lg:grid grid-cols-12 gap-12 items-center">
        <div className="col-span-7 space-y-6 text-left">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A89F91] block">
            Bem-vindo à Kurio
          </span>

          <h1 className="font-bold text-[43px] leading-[70px] tracking-normal uppercase text-[#F3E5D8]">
            SEJA DONO DO FUTURO <br />
            DA ARTE DIGITAL
          </h1>

          <p className="text-base text-[#A89F91] max-w-lg leading-relaxed font-normal">
            Descubra NFTs selecionados de criadores emergentes e consagrados.
            Colecione arte digital rara, apoie artistas e tenha uma parte da
            cultura da internet.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={onExploreClick}
              className="bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] text-sm font-black tracking-widest px-8 py-3.5 rounded-xl transition-all uppercase active:scale-95 shadow-lg shadow-[#D4A373]/10 cursor-pointer"
            >
              EXPLORAR
            </button>
          </div>
        </div>

        <div className="col-span-5 flex flex-col items-center">
          <div className="w-full aspect-square bg-[#1A1510] rounded-[2rem] overflow-hidden border border-[#3D3024] shadow-2xl relative">
            <img
              src={heroMonkeyImage}
              alt="NFT Raro Kurio"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-1.5 mt-6">
            <span className="w-2 h-2 rounded-full bg-[#D4A373]" />
            <span className="w-2 h-2 rounded-full bg-[#3D3024]" />
            <span className="w-2 h-2 rounded-full bg-[#3D3024]" />
          </div>
        </div>
      </div>

    </section>
  );
};