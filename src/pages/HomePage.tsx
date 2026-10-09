import React from 'react';
import { Route } from '../routes/index';
import { HeroSection } from '@/features/home/components/HeroSection';
import { NFTCategoryBar } from '@/features/nfts/components/NFTCategoryBar';
import { MarketplaceSection } from '@/features/nfts/components/MarketplaceSection';
import { FeaturedBannersSection } from '@/features/nfts/components/FeaturedBannersSection';
import { MintJournalSection } from '@/features/nfts/components/MintJournalSection';
import { MarketplaceDetailsSection } from '@/features/home/components/MarketplaceDetailsSection';
import { CartSection } from '@/features/cart/hooks/CartSection';
import { PaymentSection } from '@/features/nfts/components/PaymentSection';
import { Footer } from '@/features/nfts/components/Footer';
import { ProfileSection } from '@/features/profile/ProfileSection';
import { NFTFilters } from '@/types/nft';

export function HomePage(): React.JSX.Element {
  const navigate = Route.useNavigate();
  const filters = Route.useSearch() as { view?: 'home' | 'mercado' | 'carrinho' | 'pagamento' | 'perfil' | undefined } & NFTFilters;

  // Lê a view diretamente da URL (ex: ?view=mercado ou ?view=carrinho)
  const currentView = filters.view || 'home';

  const handleFilterChange = (newFilters: Partial<NFTFilters>) => {
    navigate({
      search: (old) => {
        const updated = { ...old, ...newFilters };
        if (
          newFilters.search !== undefined ||
          newFilters.category !== undefined ||
          newFilters.sortBy !== undefined
        ) {
          updated.page = 1;
        }
        return updated;
      },
      replace: true,
    });
  };

  const handleExploreClick = () => {
    const catalogElement = document.getElementById('catalog-section');
    catalogElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. View Principal (Início) */}
      {currentView === 'home' && (
        <>
          <HeroSection onExploreClick={handleExploreClick} />
          <div id="catalog-section" className="max-w-7xl mx-auto px-6 pb-20">
            <NFTCategoryBar filters={filters} onFilterChange={handleFilterChange} />
            <MarketplaceSection />
          </div>
          <FeaturedBannersSection />
          <MintJournalSection />
        </>
      )}

      {/* 2. View Detalhes do Produto (Mercado) */}
      {currentView === 'mercado' && <MarketplaceDetailsSection />}

      {/* 3. View do Carrinho */}
      {currentView === 'carrinho' && <CartSection />}

      {/* 4. View de Pagamento / Checkout */}
      {currentView === 'pagamento' && <PaymentSection />}

      {currentView === 'perfil' && <ProfileSection />}

      {/* Rodapé fixo */}
      <Footer />
    </>
  );
}