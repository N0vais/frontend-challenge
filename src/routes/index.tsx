import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '../pages/HomePage';
import { NFTFilters } from '@/types/nft';

export type ViewType = 'home' | 'mercado' | 'carrinho' | 'pagamento' | 'perfil';

const VALID_VIEWS: readonly ViewType[] = [
  'home',
  'mercado',
  'carrinho',
  'pagamento',
  'perfil',
];

//  Função Type Guard: verifica com segurança se a string é uma ViewType válida
function isValidView(value: unknown): value is ViewType {
  return typeof value === 'string' && (VALID_VIEWS as readonly string[]).includes(value);
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): NFTFilters => {
    const rawView = search.view;

    //  Uso da Type Guard (sem casts nem 'any')
    const view: ViewType = isValidView(rawView) ? rawView : 'home';

    return {
      search: typeof search.search === 'string' ? search.search : '',
      category: typeof search.category === 'string' ? search.category : undefined,
      page: typeof search.page === 'number' ? search.page : Number(search.page) || 1,
      view,
    };
  },
  component: HomePage,
});