import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#241612] text-[#F3E5D8] font-mono border-t border-[#261E17]">
      <div className="max-w-[1440px] mx-auto px-6 py-12 space-y-12">
        
        {/* ================= SECÇÃO SUPERIOR: DESTAQUES + NEWSLETTER ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start relative">
          
          {/* 1. Segurança da carteira */}
          <div className="space-y-4 pr-4 border-r-0 lg:border-r border-[#261E17] h-full">
            <div className="w-12 h-12 rounded-full bg-[#D28A4C] text-[#0F0C08] font-bold text-xl flex items-center justify-center">
              W
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Segurança da carteira
            </h3>
            <p className="text-xs text-[#A89F91] leading-relaxed max-w-xs font-sans">
              Proteja sua carteira e colecione arte digital verificada com confiança.
            </p>
          </div>

          {/* 2. Criadores em destaque */}
          <div className="space-y-4 pr-4 border-r-0 lg:border-r border-[#261E17] h-full">
            <div className="w-12 h-12 rounded-full bg-[#D28A4C] text-[#0F0C08] font-bold text-xl flex items-center justify-center">
              C
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Criadores em destaque
            </h3>
            <p className="text-xs text-[#A89F91] leading-relaxed max-w-xs font-sans">
              Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.
            </p>
          </div>

          {/* 3. Alertas de lançamentos */}
          <div className="space-y-4 pr-4 border-r-0 lg:border-r border-[#261E17] h-full">
            <div className="w-12 h-12 rounded-full bg-[#D28A4C] text-[#0F0C08] font-bold text-xl flex items-center justify-center">
              D
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Alertas de lançamentos
            </h3>
            <p className="text-xs text-[#A89F91] leading-relaxed max-w-xs font-sans">
              Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.
            </p>
          </div>

          {/* 4. Newsletter (Antecipe-se ao próximo lançamento) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide leading-tight">
              Antecipe-se ao próximo lançamento
            </h3>
            
            <form onSubmit={handleSubscribe} className="flex items-center">
              <input
                type="email"
                required
                placeholder="digite seu e-mail..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1A1510] text-xs text-[#F3E5D8] placeholder-[#6E6458] px-3 py-2.5 rounded-l-lg border border-[#3D3024] focus:outline-none focus:border-[#D28A4C] w-full"
              />
              <button
                type="submit"
                className="bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xs px-4 py-2.5 rounded-r-lg transition-all shrink-0 cursor-pointer active:scale-95"
              >
                Enviar
              </button>
            </form>

            {subscribed ? (
              <p className="text-xs text-[#D28A4C] font-bold animate-fade-in">
                ✓ E-mail cadastrado com sucesso!
              </p>
            ) : (
              <p className="text-[11px] text-[#A89F91] leading-relaxed font-sans">
                Receba lançamentos selecionados, histórias de criadores e novidades do mercado.
              </p>
            )}
          </div>
        </div>

        {/* ================= SECÇÃO CENTRAL: BARRA INSTITUCIONAL ================= */}
        <div className="bg-[#38220F] border border-[#261E17] rounded-xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#A89F91]">
          <span className="font-bold text-white tracking-[0.25em] uppercase text-sm">
            KURIO
          </span>
          <span className="text-center md:text-left font-sans">
            Feito para colecionadores, criadores e cultura
          </span>
          <a
            href="mailto:contato@email.com"
            className="hover:text-[#D28A4C] transition-colors"
          >
            contato@email.com
          </a>
          <span>+55 11 4002 8922</span>
        </div>

        {/* ================= SECÇÃO INFERIOR: LINKS + REDES SOCIAIS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-4">
          
          {/* Coluna 1: Meu Perfil */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              Meu perfil
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89F91]">
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Meu perfil</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Minha coleção</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Atividade</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Estúdio do criador</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Lista de interesse</Link></li>
            </ul>
          </div>

          {/* Coluna 2: Central de Ajuda */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              Central de ajuda
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89F91]">
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Central de ajuda</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Como comprar NFTs</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Carteira e segurança</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Política do mercado</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Denunciar item</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Coleções */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              Coleções
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89F91]">
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Arte digital</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Fotografia</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Música</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Arte 3D</Link></li>
              <li><Link to="/" className="hover:text-[#F3E5D8] transition-colors">Utilidade</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais e Carteiras */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
                Redes sociais
              </h4>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a href="https://www.facebook.com/PaginaCurioNews/?locale=pt_BR" aria-label="Facebook" className="w-8 h-8 rounded-lg border border-[#3D3024] flex items-center justify-center text-[#D28A4C] hover:border-[#D28A4C] hover:bg-[#1A1510] transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 3h-2.34v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/" aria-label="Instagram" className="w-8 h-8 rounded-lg border border-[#3D3024] flex items-center justify-center text-[#D28A4C] hover:border-[#D28A4C] hover:bg-[#1A1510] transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                {/* Twitter / X */}
                <a href="https://x.com/i/jf/onboarding/web?mode=signup" aria-label="Twitter" className="w-8 h-8 rounded-lg border border-[#3D3024] flex items-center justify-center text-[#D28A4C] hover:border-[#D28A4C] hover:bg-[#1A1510] transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/feed/" aria-label="LinkedIn" className="w-8 h-8 rounded-lg border border-[#3D3024] flex items-center justify-center text-[#D28A4C] hover:border-[#D28A4C] hover:bg-[#1A1510] transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/" aria-label="YouTube" className="w-8 h-8 rounded-lg border border-[#3D3024] flex items-center justify-center text-[#D28A4C] hover:border-[#D28A4C] hover:bg-[#1A1510] transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Carteiras Compatíveis */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 tracking-wide">
                Carteiras compatíveis
              </h4>
              <div className="inline-flex items-center gap-2 bg-[#1A1510] border border-[#3D3024] px-3 py-2 rounded-lg text-[10px] text-[#D28A4C] font-mono tracking-wider">
                <span>METAMASK</span>
                <span className="text-[#3D3024]">•</span>
                <span>WALLETCONNECT</span>
                <span className="text-[#3D3024]">•</span>
                <span>COINBASE</span>
              </div>
            </div>
          </div>

        </div>
        </div>

        {/* ================= SECÇÃO FINAL: COPYRIGHT ================= */}
        <div className="w-full mt-16 py-6 border-t border-[#261E17] bg-[#140D0A] text-center text-xs text-[#A89F91] font-sans">
        © {new Date().getFullYear()} Kurio. Propriedade digital para todos.
      </div>

      
    </footer>
  );
};