import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { PurchaseSuccessModal } from './PurchaseSuccessModal';
import { useCart } from '@/context/CartContext'; // Import do contexto dinâmico

export const PaymentSection: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart(); // Lendo o carrinho global
  const [selectedWallet, setSelectedWallet] = useState<'all' | 'metamask' | 'coinbase'>('coinbase');
  const [useOtherWallet, setUseOtherWallet] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    network: '',
    profileName: '',
    walletAddress: '',
    secondaryWallet: '',
    walletType: '',
    referralCode: '',
    email: '',
    ensName: '.eth',
    collectorNote: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Cálculos dinâmicos com base nos itens do carrinho
  const networkFee = 0.016;
  const subtotal = totalPrice;
  const total = subtotal > 0 ? subtotal + networkFee : 0;

  const handleConfirmPurchase = () => {
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    clearCart(); // Limpa o carrinho ao fechar o modal de compra realizada
  };

  if (cart.length === 0 && !isSuccessModalOpen) {
    return (
      <section className="w-full bg-[#0F0C08] min-h-[70vh] flex items-center justify-center font-mono text-[#F3E5D8] px-6 py-16">
        <div className="max-w-md w-full bg-[#1A1510] border border-[#261E17] rounded-2xl p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-[#261E17] rounded-full flex items-center justify-center mx-auto text-[#D28A4C]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">
              Nenhum item para checkout
            </h2>
            <p className="text-xs text-[#A89F91] leading-relaxed">
              Seu carrinho está vazio. Adicione NFTs ao carrinho antes de prosseguir para o pagamento.
            </p>
          </div>
          <Link
            to="/"
            search={(prev) => ({ ...prev, view: 'mercado' })}
            className="inline-block w-full bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xs py-3.5 rounded-xl uppercase transition-all cursor-pointer"
          >
            Explorar Mercado
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#0F0C08] max-w-[1440px] mx-auto px-6 py-8 font-mono text-[#F3E5D8]">
      {/* Breadcrumb */}
      <div className="text-xs text-[#A89F91] mb-6">
        <span>Início</span> <span className="mx-2">/</span>{' '}
        <span>Mercado</span> <span className="mx-2">/</span>{' '}
        <span className="text-[#D28A4C]">Pagamento</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LADO ESQUERDO: PERFIL DO COLECIONADOR (7 COLS)*/}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Perfil do colecionador
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {/* Nome de exibição */}
            <div>
              <label className="text-xs text-[#F3E5D8] block mb-1.5">
                Nome de exibição<span className="text-[#D28A4C]">*</span>
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => handleChange('displayName', e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
              />
            </div>

            {/* Nome de usuário */}
            <div>
              <label className="text-xs text-[#F3E5D8] block mb-1.5">
                Nome de usuário<span className="text-[#D28A4C]">*</span>
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
              />
            </div>

            {/* Rede */}
            <div>
              <label className="text-xs text-[#F3E5D8] block mb-1.5">
                Rede <span className="text-[#D28A4C]">*</span>
              </label>
              <select
                value={formData.network}
                onChange={(e) => handleChange('network', e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-[#A89F91] outline-none focus:border-[#D28A4C] transition-colors cursor-pointer appearance-none"
              >
                <option value="">Selecione uma rede</option>
                <option value="ethereum">Ethereum Mainnet</option>
                <option value="polygon">Polygon</option>
              </select>
            </div>

            {/* Nome do perfil */}
            <div>
              <label className="text-xs text-[#F3E5D8] block mb-1.5">
                Nome do perfil<span className="text-[#D28A4C]">*</span>
              </label>
              <input
                type="text"
                value={formData.profileName}
                onChange={(e) => handleChange('profileName', e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
              />
            </div>

            {/* Endereço da carteira */}
            <div>
              <label className="text-xs text-[#F3E5D8] block mb-1.5">
                Endereço da carteira<span className="text-[#D28A4C]">*</span>
              </label>
              <input
                type="text"
                placeholder="Endereço 0x da carteira"
                value={formData.walletAddress}
                onChange={(e) => handleChange('walletAddress', e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#A89F91]/50 outline-none focus:border-[#D28A4C] transition-colors"
              />
            </div>

            {/* ENS ou carteira secundária */}
            <div>
              <label className="text-xs opacity-0 block mb-1.5">Ajuste</label>
              <input
                type="text"
                placeholder="ENS ou carteira secundária (opcional)"
                value={formData.secondaryWallet}
                onChange={(e) => handleChange('secondaryWallet', e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#A89F91]/50 outline-none focus:border-[#D28A4C] transition-colors"
              />
            </div>

            {/* Tipo de carteira */}
            <div>
              <label className="text-xs text-[#F3E5D8] block mb-1.5">
                Tipo de carteira<span className="text-[#D28A4C]">*</span>
              </label>
              <select
                value={formData.walletType}
                onChange={(e) => handleChange('walletType', e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-[#A89F91] outline-none focus:border-[#D28A4C] transition-colors cursor-pointer appearance-none"
              >
                <option value="">Selecione uma carteira</option>
                <option value="metamask">MetaMask</option>
                <option value="coinbase">Coinbase Wallet</option>
              </select>
            </div>

            {/* Código de indicação */}
            <div>
              <label className="text-xs text-[#F3E5D8] block mb-1.5">
                Código de indicação<span className="text-[#D28A4C]">*</span>
              </label>
              <input
                type="text"
                value={formData.referralCode}
                onChange={(e) => handleChange('referralCode', e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
              />
            </div>

            {/* E-mail */}
            <div>
              <label className="text-xs text-[#F3E5D8] block mb-1.5">
                E-mail<span className="text-[#D28A4C]">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
              />
            </div>

            {/* Nome ENS */}
            <div>
              <label className="text-xs text-[#F3E5D8] block mb-1.5">
                Nome ENS <span className="text-[#D28A4C]">*</span>
              </label>
              <select
                value={formData.ensName}
                onChange={(e) => handleChange('ensName', e.target.value)}
                className="w-24 bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors cursor-pointer appearance-none"
              >
                <option value=".eth">.eth</option>
                <option value=".xyz">.xyz</option>
              </select>
            </div>
          </div>

          {/* Radio: Usar outra carteira? */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUseOtherWallet(!useOtherWallet)}
              className="w-4 h-4 rounded-full border border-[#D28A4C] flex items-center justify-center cursor-pointer"
            >
              {useOtherWallet && <span className="w-2 h-2 rounded-full bg-[#D28A4C]" />}
            </button>
            <span className="text-xs text-[#F3E5D8]">Usar outra carteira?</span>
          </div>

          {/* Observação do colecionador */}
          <div className="pt-2">
            <label className="text-xs text-[#A89F91] block mb-1.5">
              Observação do colecionador (opcional)
            </label>
            <textarea
              rows={4}
              value={formData.collectorNote}
              onChange={(e) => handleChange('collectorNote', e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg p-3 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors resize-none"
            />
          </div>
        </div>

        {/* LADO DIREITO: SEUS NFTS E RESUMO (5 COLS)  */}
        <div className="lg:col-span-5 space-y-6">
          {/* Título Seus NFTs + Tabela Dinâmica */}
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-4">
              Seus NFTs ({cart.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>

            <div className="flex justify-between text-xs text-[#A89F91] pb-2 border-b border-[#261E17]">
              <span>NFTs</span>
              <span>Subtotal</span>
            </div>

            {/* Cards de resumo dos NFTs Dinâmicos */}
            <div className="space-y-3 pt-3">
              {cart.map((item) => {
                const itemSubtotal = item.priceEth * item.quantity;

                return (
                  <div
                    key={`${item.id}-${item.edition}`}
                    className="bg-[#1A1510] border border-[#261E17] rounded-xl p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#0F0C08]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-xs font-bold text-white truncate">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-[#A89F91] mt-0.5">
                          Edição: <span className="text-[#D28A4C]">{item.edition}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#A89F91]">(x {item.quantity})</span>
                      <span className="text-xs font-bold text-[#D28A4C]">
                        {itemSubtotal.toFixed(2)} ETH
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Código promocional link */}
          <div className="text-right">
            <button className="text-xs text-[#A89F91] hover:text-[#D28A4C] transition-colors cursor-pointer">
              Tem um código promocional? Aplique aqui
            </button>
          </div>

          {/* Discriminativo de Valores Dinâmicos */}
          <div className="space-y-3 pt-2 text-xs border-t border-[#261E17]">
            <div className="flex justify-between items-center text-[#A89F91]">
              <span>Subtotal</span>
              <span className="text-white font-bold">{subtotal.toFixed(2)} ETH</span>
            </div>

            <div className="flex justify-between items-center text-[#A89F91]">
              <span>Desconto do lançamento</span>
              <span className="text-[#A89F91]">(-) 00.00</span>
            </div>

            <div className="flex justify-between items-center text-[#A89F91]">
              <div>
                <span>Taxa de rede</span>
                <span className="block text-[10px] text-[#A89F91]/60">
                  Taxa estimada
                </span>
              </div>
              <span className="text-white font-bold">{networkFee} ETH</span>
            </div>

            <div className="border-t border-[#261E17] pt-4 flex justify-between items-center">
              <span className="font-bold text-white">Total</span>
              <span className="text-base font-bold text-[#D28A4C]">
                {total.toFixed(3)} ETH
              </span>
            </div>
          </div>

          {/* Seleção de Carteira e Rede */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-white text-center uppercase tracking-wider mb-2">
              Carteira e rede
            </h3>

            {/* Opção 1: Multi-wallet */}
            <div
              onClick={() => setSelectedWallet('all')}
              className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${selectedWallet === 'all'
                  ? 'border-[#D28A4C] bg-[#1A1510]'
                  : 'border-[#261E17] bg-[#1A1510]/50 hover:border-[#3D3024]'
                }`}
            >
              <div className="w-4 h-4 rounded-full border border-[#D28A4C] flex items-center justify-center shrink-0">
                {selectedWallet === 'all' && (
                  <span className="w-2 h-2 rounded-full bg-[#D28A4C]" />
                )}
              </div>
              <span className="text-[10px] text-[#D28A4C] font-bold uppercase tracking-widest">
                METAMASK • WALLETCONNECT • COINBASE
              </span>
            </div>

            {/* Opção 2: MetaMask */}
            <div
              onClick={() => setSelectedWallet('metamask')}
              className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${selectedWallet === 'metamask'
                  ? 'border-[#D28A4C] bg-[#1A1510]'
                  : 'border-[#261E17] bg-[#1A1510]/50 hover:border-[#3D3024]'
                }`}
            >
              <div className="w-4 h-4 rounded-full border border-[#D28A4C] flex items-center justify-center shrink-0">
                {selectedWallet === 'metamask' && (
                  <span className="w-2 h-2 rounded-full bg-[#D28A4C]" />
                )}
              </div>
              <span className="text-xs font-bold text-white">MetaMask</span>
            </div>

            {/* Opção 3: Coinbase Wallet */}
            <div
              onClick={() => setSelectedWallet('coinbase')}
              className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${selectedWallet === 'coinbase'
                  ? 'border-[#D28A4C] bg-[#1A1510]'
                  : 'border-[#261E17] bg-[#1A1510]/50 hover:border-[#3D3024]'
                }`}
            >
              <div className="w-4 h-4 rounded-full border border-[#D28A4C] flex items-center justify-center shrink-0">
                {selectedWallet === 'coinbase' && (
                  <span className="w-2 h-2 rounded-full bg-[#D28A4C]" />
                )}
              </div>
              <span className="text-xs font-bold text-white">
                Coinbase Wallet
              </span>
            </div>
          </div>

          {/* Botão Finalizar */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleConfirmPurchase}
              className="w-full bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xs py-3.5 rounded-lg transition-all cursor-pointer uppercase active:scale-[0.99]"
            >
              Confirmar compra
            </button>

            {/* Render do Modal de Sucesso */}
            <PurchaseSuccessModal
              isOpen={isSuccessModalOpen}
              onClose={handleCloseSuccessModal}
            />
          </div>
        </div>
      </div>
    </section>
  );
};