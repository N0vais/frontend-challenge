import React, { useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { AuthModal } from '@/components/auth/AuthModal';
import { useCart } from '@/context/CartContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const filters = useSearch({ strict: false }) as { search?: string; view?: string };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Atualiza a URL em tempo real quando o usuário digita
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchValue(text);

    navigate({
      to: '/',
      search: (old) => ({
        ...old,
        search: text || undefined,
        view: old.view || 'home',
      }),
      replace: true,
    });

    if (text.length === 1) {
      const catalog = document.getElementById('catalog-section');
      catalog?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const search = useSearch({ strict: false }) as { view?: string };
  const currentView = search?.view || 'home';

  const navItems = [
    { label: 'Início', view: 'home' as const },
    { label: 'Mercado', view: 'mercado' as const },
    { label: 'Criadores', view: 'sobre' as const },
    { label: 'Aprenda', view: undefined },
  ];

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <header className="hidden md:block border-b border-[#261E17] bg-[#140D0A] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">

        {/* Logo (Reseta para a Home) */}
        <Link
          to="/"
          search={(prev: Record<string, unknown>) => ({ ...prev, view: undefined })}
          className="text-logo text-base tracking-widest text-white uppercase cursor-pointer"
        >
          KURIO
        </Link>

        {/* Links de Navegação (Desktop) */}
        <nav className="flex items-center gap-8 text-sm font-medium h-full relative">
          {navItems.map((item) => {
            const isActive = item.view !== undefined && item.view === currentView;

            return (
              <Link
                key={item.label}
                to="/"
                search={(prev: Record<string, unknown>) =>
                  ({
                    ...prev,
                    view: item.view === 'home' ? undefined : item.view,
                  }) as unknown as Record<string, string | undefined>
                }
                className={`relative h-full flex items-center transition-colors duration-200 cursor-pointer ${isActive ? 'text-[#D28A4C] font-semibold' : 'text-[#A89F91] hover:text-[#F3E5D8]'
                  }`}
              >
                {item.label}

                {/* Traço indicador de 3px sobre a borda */}
                {isActive && (
                  <span
                    className="absolute left-0 w-full bg-[#D28A4C] rounded-t-full transition-all duration-300 ease-out"
                    style={{
                      height: '3px',
                      bottom: '-0.3px',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Ações da Direita (Lupa, Carrinho, Entrar) */}
        <div className="flex items-center gap-3 gap-5">

          {/* Busca / Lupa Expansível (Desktop & Mobile fallback) */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#1A1510] border border-[#D28A4C] rounded-full px-3 py-1.5 transition-all w-40 sm:w-64">
                <input
                  type="text"
                  autoFocus
                  placeholder="Buscar NFT..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="bg-transparent text-xs text-[#F3E5D8] placeholder-[#A89F91]/60 outline-none w-full font-mono"
                />
                <button
                  type="button"
                  onClick={toggleSearch}
                  aria-label="Fechar busca"
                  className="text-[#A89F91] hover:text-white ml-1 cursor-pointer"
                >
                  X
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={toggleSearch}
                aria-label="Pesquisar"
                className="text-[#F3E5D8] hover:text-[#D28A4C] transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Carrinho com Badge Dinâmico */}
          <Link
            to="/"
            search={(prev) => ({
              ...prev,
              view: 'carrinho',
            })}
            aria-label="Carrinho de Compras"
            className="relative text-[#F3E5D8] hover:text-[#D28A4C] transition-colors cursor-pointer flex items-center justify-center p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>

            {/* Badge Dinâmico */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#D28A4C] text-[#0F0C08] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Botão Entrar */}
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Entrar
          </button>

        </div>
      </div>

      {/* Modal de Autenticação */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};