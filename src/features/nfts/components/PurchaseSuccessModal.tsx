import React from 'react';

// Importe os assets do projeto
import heroMonkeyImage from '@/assets/monkey-hero.png';
import heroMonkeyBlue from '@/assets/monkey-blue.png';
import heroMonkeyBrow from '@/assets/monkey-brow.png';

interface PurchaseSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PURCHASED_ITEMS = [
  {
    id: '1',
    tokenId: '#0042',
    title: 'Emerald Ape #042',
    quantity: 2,
    subtotal: '2.38 ETH',
    image: heroMonkeyImage,
  },
  {
    id: '2',
    tokenId: '#0314',
    title: 'Violet Nomad #314',
    quantity: 6,
    subtotal: '8.34 ETH',
    image: heroMonkeyBlue,
  },
  {
    id: '3',
    tokenId: '#0088',
    title: 'Ivory Baron #088',
    quantity: 9,
    subtotal: '16.11 ETH',
    image: heroMonkeyBrow,
  },
];

export const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-mono text-[#F3E5D8]">
      {/* Container Principal do Modal */}
      <div className="relative w-full max-w-[560px] bg-[#140D0A] border border-[#261E17] rounded-2xl p-8 shadow-2xl overflow-hidden border-b-[6px] border-b-[#D28A4C]">
        
        {/* Botão Fechar (X) */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-5 right-5 text-[#A89F91] hover:text-white transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Topo: Ícone Envelope e Mensagem */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 mb-3 text-[#D28A4C] flex items-center justify-center">
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-xs text-[#A89F91]">
            Seus NFTs agora estão na sua carteira
          </p>
        </div>

        {/* Barra de Metadados da Transação */}
        <div className="border-y border-[#261E17] py-3 my-4 grid grid-cols-4 gap-2 text-center text-[11px]">
          <div className="border-r border-[#261E17] pr-2">
            <span className="text-[#A89F91] block mb-0.5">ID da transação</span>
            <span className="text-white font-bold truncate block">0xA91F...E82C</span>
          </div>
          <div className="border-r border-[#261E17] px-2">
            <span className="text-[#A89F91] block mb-0.5">Data</span>
            <span className="text-white font-bold block">29 Jul, 2026</span>
          </div>
          <div className="border-r border-[#261E17] px-2">
            <span className="text-[#A89F91] block mb-0.5">Total</span>
            <span className="text-[#D28A4C] font-bold block">26.846 ETH</span>
          </div>
          <div className="pl-2">
            <span className="text-[#A89F91] block mb-0.5">Carteira</span>
            <span className="text-white font-bold block">MetaMask</span>
          </div>
        </div>

        {/* Detalhes da Transação */}
        <div className="space-y-4 my-6">
          <h3 className="text-xs font-bold text-white">Detalhes da transação</h3>
          
          <div className="flex justify-between text-[11px] text-[#A89F91] pb-1 border-b border-[#261E17]">
            <span>NFTs</span>
            <div className="flex gap-12">
              <span>Edições</span>
              <span>Subtotal</span>
            </div>
          </div>

          {/* Lista dos Itens */}
          <div className="space-y-3">
            {PURCHASED_ITEMS.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#0F0C08] shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-[10px] text-[#A89F91]">ID do token: {item.tokenId}</p>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                  <span className="text-[#A89F91] text-[11px]">(x {item.quantity})</span>
                  <span className="font-bold text-[#D28A4C] min-w-[70px] text-right">
                    {item.subtotal}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Taxas e Total */}
          <div className="pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-[#A89F91]">
              <span>Taxa de rede</span>
              <span className="text-white font-bold">0.016 ETH</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-1">
              <span className="text-white">Total</span>
              <span className="text-[#D28A4C]">26.846 ETH</span>
            </div>
          </div>
        </div>

        {/* Mensagem Informativa */}
        <p className="text-[11px] text-[#A89F91] text-center leading-relaxed mb-6 px-4">
          Transação confirmada na Ethereum. A propriedade foi transferida para sua carteira conectada e registrada na rede.
        </p>

        {/* Botão Ver no Etherscan */}
        <div className="flex justify-center">
          <a
            href="https://etherscan.io"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xs py-3 px-8 rounded-lg transition-all cursor-pointer uppercase text-center active:scale-95"
          >
            Ver no Etherscan
          </a>
        </div>

      </div>
    </div>
  );
};