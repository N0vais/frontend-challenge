import React, { useState } from 'react';
import monkeyHeroImg from '@/assets/monkey-hero.png';

interface NFTDetailsProps {
  onBack?: () => void;
  onBuy?: (quantity: number, edition: string) => void;
}

export const NFTDetailsModal: React.FC<NFTDetailsProps> = ({ onBack, onBuy }) => {
  const [selectedEdition, setSelectedEdition] = useState<'1/10' | '1/50' | 'ABERTA'>('1/50');
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const pricePerUnit = 1.19;

  return (
    <div className="max-w-md mx-auto bg-[#18110D] border border-[#261E17] rounded-3xl p-4 text-[#F3E5D8] font-mono space-y-4">

      {/* Botões Superiores (Voltar e Favorito) */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="w-10 h-10 rounded-full bg-[#261C16] border border-[#3D2B1F] flex items-center justify-center text-[#F3E5D8] hover:border-[#D28A4C] transition-colors cursor-pointer"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label="Favoritar"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${isFavorite
              ? 'bg-[#D28A4C] text-[#0F0C08] border-[#D28A4C]'
              : 'bg-[#261C16] text-[#F3E5D8] border-[#3D2B1F] hover:border-[#D28A4C]'
            }`}
        >
          <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Imagem do NFT */}
      <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#0F0C08] border border-[#261E17]">
        <img
          src={monkeyHeroImg}
          alt="Emerald Ape #042"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Detalhes e Descrição */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-wide">
            Emerald Ape #042
          </h2>
          {/* Badge de Avaliação */}
          <div className="flex items-center gap-1 bg-[#261C16] border border-[#3D2B1F] rounded-full px-2.5 py-0.5 text-xs">
            <span className="text-[#D28A4C]">★</span>
            <span className="font-bold text-white">4.8</span>
            <span className="text-[#A89F91] text-[10px]">(19)</span>
          </div>
        </div>

        <p className="text-xs text-[#A89F91] leading-relaxed">
          Um colecionável digital 1/50 finalizado à mão da coleção Kurio Editions, verificado na Ethereum.
        </p>

        {/* Seleção de Edição */}
        <div className="space-y-1.5 pt-1">
          <span className="text-xs font-bold text-white block">Edição:</span>
          <div className="flex items-center gap-2 text-xs">
            {(['1/10', '1/50', 'ABERTA'] as const).map((edition) => {
              const isSelected = selectedEdition === edition;
              return (
                <button
                  key={edition}
                  type="button"
                  onClick={() => setSelectedEdition(edition)}
                  className={`px-3 py-1 rounded-full border transition-all cursor-pointer font-bold ${isSelected
                      ? 'border-[#D28A4C] text-[#D28A4C] bg-[#D28A4C]/10'
                      : 'border-[#3D2B1F] text-[#A89F91] bg-[#261C16]'
                    }`}
                >
                  {edition}
                </button>
              );
            })}
          </div>
        </div>

        {/* Metadados */}
        <div className="space-y-1 text-xs text-[#A89F91] pt-2">
          <div><span className="text-[#F3E5D8]">ID do token:</span> #0042</div>
          <div><span className="text-[#F3E5D8]">Coleção:</span> Kurio Apes</div>
          <div><span className="text-[#F3E5D8]">Atributos:</span> Óculos, Esmeralda, Raro</div>
        </div>
      </div>

      {/* Rodapé de Compra com Seletor de Quantidade e Preço */}
      <div className="bg-[#120B08] border border-[#261E17] rounded-2xl p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          {/* Controle de Quantidade (- 1 +) */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#A89F91]">Qtd.</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-6 h-6 rounded-full bg-[#D28A4C] text-[#0F0C08] font-bold flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
              >
                -
              </button>
              <span className="text-sm font-bold text-white w-4 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-6 h-6 rounded-full bg-[#D28A4C] text-[#0F0C08] font-bold flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
              >
                +
              </button>
            </div>
          </div>

          {/* Preço Total em ETH */}
          <div className="text-right">
            <span className="text-base font-bold text-[#D28A4C]">
              {(pricePerUnit * quantity).toFixed(2)} ETH
            </span>
          </div>
        </div>

        {/* Botão Principal de Comprar + Ícone Carrinho */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onBuy?.(quantity, selectedEdition)}
            className="flex-1 bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xs py-3 rounded-xl transition-all cursor-pointer active:scale-95"
          >
            Comprar NFT
          </button>

          <button
            type="button"
            aria-label="Adicionar ao carrinho"
            className="w-11 h-11 bg-[#261C16] border border-[#3D2B1F] hover:border-[#D28A4C] text-[#F3E5D8] rounded-xl flex items-center justify-center cursor-pointer transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};