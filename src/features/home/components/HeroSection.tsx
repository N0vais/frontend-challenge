import React from 'react';
import heroMonkeyImage from '@/assets/monkey-hero.png';

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-6  bg-[#140D0A]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Lado Esquerdo: Textos e CTA */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A89F91] block">
            Bem-vindo à Kurio
          </span>

          <h1 className="font-bold text-3xl sm:text-4xl md:text-[43px] leading-tight md:leading-[70px] tracking-normal uppercase text-[#F3E5D8]">
  SEJA DONO DO FUTURO <br />
  DA ARTE DIGITAL
</h1>

          <p className="text-sm md:text-base text-[#A89F91] max-w-lg leading-relaxed font-normal">
            Descubra NFTs selecionados de criadores emergentes e consagrados.
            Colecione arte digital rara, apoie artistas e tenha uma parte da
            cultura da internet.
          </p>

          <div className="pt-2">
            <button
              onClick={onExploreClick}
              className="bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] text-xs md:text-sm font-black tracking-widest px-8 py-3.5 rounded-xl transition-all uppercase active:scale-95 shadow-lg shadow-[#D4A373]/10"
            >
              EXPLORAR
            </button>
          </div>
        </div>

        {/* Lado Direito: Carrossel / Card NFT em Destaque */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full aspect-square bg-[#1A1510] rounded-[2rem] overflow-hidden border border-[#3D3024] shadow-2xl relative">
            <img
              src={heroMonkeyImage}
              alt="NFT Raro Kurio"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Indicadores de Slide */}
          <div className="flex items-center gap-1.5 mt-6">
            <span className="w-2 h-2 rounded-full bg-[#D4A373]"></span>
            <span className="w-2 h-2 rounded-full bg-[#3D3024]"></span>
            <span className="w-2 h-2 rounded-full bg-[#3D3024]"></span>
          </div>
        </div>

      </div>
    </section>
  );
};



























