import React, { useState } from 'react';

export const QuantitySelector: React.FC = () => {
  // Estado para armazenar a quantidade (inicia em 1)
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Botão de Menos (-) - Só aparece se quantidade > 1 */}
      {quantity > 1 && (
        <button
          type="button"
          onClick={handleDecrement}
          aria-label="Diminuir quantidade"
          className="w-10 h-14 rounded-[20px] bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md"
        >
          −
        </button>
      )}

      {/* Número da Quantidade Selecionada */}
      <span className="text-white font-mono font-bold text-lg min-w-[24px] text-center px-1">
        {quantity}
      </span>

      {/* Botão de Mais (+) */}
      <button
        type="button"
        onClick={handleIncrement}
        aria-label="Aumentar quantidade"
        className="w-10 h-14 rounded-[20px] bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md"
      >
        +
      </button>
    </div>
  );
};