import React, { useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { AuthModal } from '@/components/auth/AuthModal';
import { useCart } from '@/context/CartContext'; // 👈 Importa o contexto do carrinho

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart(); // 👈 Obtém o total dinâmico de itens
  const filters = useSearch({ strict: false }) as { search?: string; view?: string };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Atualiza a URL em tempo real quando o usuário digita
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchValue(text);

    navigate({
      to: '/',
      search: (old) => ({
        ...old,
        search: text || undefined, // Remove da URL se estiver vazio
        view: old.view || 'home',  // Garante que o catálogo da home processe
      }),
      replace: true,
    });

    // Rola suavemente para o catálogo se estiver na Home e o usuário começar a digitar
    if (text.length === 1) {
      const catalog = document.getElementById('catalog-section');
      catalog?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Lê a rota ativa da URL dinamicamente sem perdas de parâmetros
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
    <header className="border-b border-[#261E17] bg-[#140D0A] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        
        {/* Logo (Reseta para a Home) */}
        <Link
          to="/"
          search={(prev) => ({ ...prev, view: undefined })}
          className="text-logo text-base tracking-widest text-white uppercase cursor-pointer"
        >
          KURIO
        </Link>

        {/* Links de Navegação (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium h-full relative">
          {navItems.map((item) => {
            
            const isActive = item.view !== undefined && item.view === currentView;
              

            return (
              <Link
        key={item.label}
        to="/"
        search={(prev) => ({
          ...prev,
          // Mantém a sua regra: 'home' vira undefined na URL, as outras viram o nome da view
          view: item.view === 'home' ? undefined : item.view,
          } as unknown as Record<string, string | undefined>)
        }
        className={`relative h-full flex items-center transition-colors duration-200 cursor-pointer ${
          isActive ? 'text-[#D28A4C] font-semibold' : 'text-[#A89F91] hover:text-[#F3E5D8]'
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
        <div className="flex items-center gap-5">
          
          {/* Busca / Lupa Expansível */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#1A1510] border border-[#D28A4C] rounded-full px-3 py-1.5 transition-all w-48 sm:w-64">
                <input
                  type="text"
                  autoFocus
                  placeholder="Buscar NFT..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="bg-transparent text-xs text-[#F3E5D8] placeholder-[#A89F91]/60 outline-none w-full font-mono"
                />
                <button
                  onClick={toggleSearch}
                  aria-label="Fechar busca"
                  className="text-[#A89F91] hover:text-white ml-1 cursor-pointer"
                >
                  ✕
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
            className="relative text-[#F3E5D8] hover:text-[#D28A4C] transition-colors cursor-pointer flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            
            {/* Badge Dinâmico (Renderiza somente se houver itens) */}
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#D28A4C] text-[#0F0C08] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Botão Entrar */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Entrar
          </button>

          {/* Menu Hambúrguer (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#F3E5D8] cursor-pointer"
            aria-label="Abrir Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A1510] border-b border-[#3D3024] px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive =
              (item.view === 'home' && currentView === 'home') ||
              (item.view === 'mercado' && currentView === 'mercado');

            return (
              <Link
                key={item.label}
                to="/"
                search={(prev) => ({
                  ...prev,
                  vview: item.view === 'home' ? undefined : item.view,
                  } as unknown as Record<string, string | undefined>)}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-semibold cursor-pointer ${
                  isActive ? 'text-[#D28A4C]' : 'text-[#A89F91]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsAuthModalOpen(true);
            }}
            className="w-full bg-[#D28A4C] text-[#0F0C08] font-bold py-2.5 rounded-xl cursor-pointer"
          >
            Entrar
          </button>
        </div>
      )}

      {/* Modal de Autenticação */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};