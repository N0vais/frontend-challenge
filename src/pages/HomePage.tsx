import React from 'react';
import { Route } from '../routes/index';
import { HeroSection } from '@/features/home/components/HeroSection';
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
  const filters = Route.useSearch() as { view?: 'home' | 'mercado' | 'carrinho' | 'pagamento' | 'perfil' | undefined } & NFTFilters;

  // Lê a view diretamente da URL (ex: ?view=mercado ou ?view=carrinho)
  const currentView = filters.view || 'home';

  const handleExploreClick = () => {
    const catalogElement = document.getElementById('catalog-section');
    catalogElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/*  View Principal (Início) */}
      {currentView === 'home' && (
        <>
          <HeroSection onExploreClick={handleExploreClick} />
          <div id="catalog-section" className="max-w-7xl mx-auto px-6 pb-20">
            <MarketplaceSection />
          </div>
          <FeaturedBannersSection />
          <MintJournalSection />
        </>
      )}

      {/* View Detalhes do Produto (Mercado) */}
      {currentView === 'mercado' && <MarketplaceDetailsSection />}

      {/* View do Carrinho */}
      {currentView === 'carrinho' && <CartSection />}

      {/* View de Pagamento / Checkout */}
      {currentView === 'pagamento' && <PaymentSection />}

      {currentView === 'perfil' && <ProfileSection />}

      {/* Rodapé fixo */}
      <Footer />
    </>
  );
}