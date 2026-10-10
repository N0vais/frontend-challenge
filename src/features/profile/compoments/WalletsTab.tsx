import React, { useState } from 'react';

export const WalletsTab: React.FC = () => {
  const [walletData, setWalletData] = useState({
    displayName: '',
    walletNickname: '',
    network: '',
    profileName: '',
    walletAddress: '',
    secondaryEns: '',
    walletType: '',
    referralCode: '',
    email: '',
    ensDomain: '.eth',
    ensHandle: '',
    sameAsMain: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setWalletData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da carteira salvos:', walletData);
  };

  return (
    <div className="space-y-8 font-mono text-[#F3E5D8]">

      {/*CARTEIRA PRINCIPAL */}
      <form onSubmit={handleSave} className="space-y-6">

        {/* Cabeçalho da Seção */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-1">
              Carteira principal
            </h2>
            <p className="text-xs text-[#A89F91]">
              Estas carteiras ficam disponíveis no pagamento e para receber NFTs comprados.
            </p>
          </div>
          <button
            type="button"
            className="text-xs font-bold text-[#D28A4C] hover:underline cursor-pointer"
          >
            Adicionar
          </button>
        </div>

        {/* Formulário Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

          {/* Nome de exibição */}
          <div>
            <label className="text-xs block mb-1.5">
              Nome de exibição<span className="text-[#D28A4C]">*</span>
            </label>
            <input
              type="text"
              required
              value={walletData.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
            />
          </div>

          {/* Apelido da carteira */}
          <div>
            <label className="text-xs block mb-1.5">
              Apelido da carteira<span className="text-[#D28A4C]">*</span>
            </label>
            <input
              type="text"
              required
              value={walletData.walletNickname}
              onChange={(e) => handleChange('walletNickname', e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
            />
          </div>

          {/* Rede */}
          <div>
            <label className="text-xs block mb-1.5">
              Rede<span className="text-[#D28A4C]">*</span>
            </label>
            <select
              required
              value={walletData.network}
              onChange={(e) => handleChange('network', e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-[#A89F91] focus:text-white outline-none focus:border-[#D28A4C] transition-colors cursor-pointer"
            >
              <option value="" disabled>
                Selecione uma rede
              </option>
              <option value="ethereum">Ethereum (ETH)</option>
              <option value="polygon">Polygon (MATIC)</option>
              <option value="solana">Solana (SOL)</option>
            </select>
          </div>

          {/* Nome do perfil */}
          <div>
            <label className="text-xs block mb-1.5">
              Nome do perfil<span className="text-[#D28A4C]">*</span>
            </label>
            <input
              type="text"
              required
              value={walletData.profileName}
              onChange={(e) => handleChange('profileName', e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
            />
          </div>

          {/* Endereço da carteira */}
          <div>
            <label className="text-xs block mb-1.5">
              Endereço da carteira<span className="text-[#D28A4C]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Endereço 0x da carteira"
              value={walletData.walletAddress}
              onChange={(e) => handleChange('walletAddress', e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#A89F91]/50 outline-none focus:border-[#D28A4C] transition-colors"
            />
          </div>

          {/* ENS ou carteira secundária (opcional) */}
          <div>
            <label className="text-xs block mb-1.5 opacity-0">
              Opcional
            </label>
            <input
              type="text"
              placeholder="ENS ou carteira secundária (opcional)"
              value={walletData.secondaryEns}
              onChange={(e) => handleChange('secondaryEns', e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#A89F91]/50 outline-none focus:border-[#D28A4C] transition-colors"
            />
          </div>

          {/* Tipo de carteira */}
          <div>
            <label className="text-xs block mb-1.5">
              Tipo de carteira<span className="text-[#D28A4C]">*</span>
            </label>
            <select
              required
              value={walletData.walletType}
              onChange={(e) => handleChange('walletType', e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-[#A89F91] focus:text-white outline-none focus:border-[#D28A4C] transition-colors cursor-pointer"
            >
              <option value="" disabled>
                Selecione uma carteira
              </option>
              <option value="metamask">MetaMask</option>
              <option value="phantom">Phantom</option>
              <option value="walletconnect">WalletConnect</option>
              <option value="coinbase">Coinbase Wallet</option>
            </select>
          </div>

          {/* Código de indicação */}
          <div>
            <label className="text-xs block mb-1.5">
              Código de indicação<span className="text-[#D28A4C]">*</span>
            </label>
            <input
              type="text"
              required
              value={walletData.referralCode}
              onChange={(e) => handleChange('referralCode', e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
            />
          </div>

          {/* E-mail */}
          <div>
            <label className="text-xs block mb-1.5">
              E-mail<span className="text-[#D28A4C]">*</span>
            </label>
            <input
              type="email"
              required
              value={walletData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
            />
          </div>

          {/* Nome ENS */}
          <div>
            <label className="text-xs block mb-1.5">
              Nome ENS<span className="text-[#D28A4C]">*</span>
            </label>
            <div className="flex items-center gap-2">
              <select
                value={walletData.ensDomain}
                onChange={(e) => handleChange('ensDomain', e.target.value)}
                className="bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors cursor-pointer shrink-0"
              >
                <option value=".eth">.eth</option>
                <option value=".xyz">.xyz</option>
              </select>
              <input
                type="text"
                required
                value={walletData.ensHandle}
                onChange={(e) => handleChange('ensHandle', e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
              />
            </div>
          </div>

        </div>

        {/* Botão Salvar Carteira */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xs py-3 px-6 rounded-lg transition-all cursor-pointer uppercase active:scale-[0.98]"
          >
            Salvar carteira
          </button>
        </div>

      </form>

      {/* ================= CARTEIRA SECUNDÁRIA ================= */}
      <div className="pt-6 border-t border-[#261E17] space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              Carteira secundária
            </h3>
            <p className="text-xs text-[#A89F91]">
              Você ainda não adicionou uma carteira secundária.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-[#A89F91] hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={walletData.sameAsMain}
                onChange={(e) => handleChange('sameAsMain', e.target.checked)}
                className="w-3.5 h-3.5 accent-[#D28A4C] rounded cursor-pointer"
              />
              <span>Igual à carteira principal</span>
            </label>

            <button
              type="button"
              className="font-bold text-[#D28A4C] hover:underline cursor-pointer"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};






















































