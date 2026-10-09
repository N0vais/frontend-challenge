import heroMonkeyImage from '@/assets/monkey-hero.png';
import heroMonkeyBlue from '@/assets/monkey-blue.png';
import heroMonkeyBrow from '@/assets/monkey-brow.png';
import heroMonkeyBege from '@/assets/monkey-bege.png';

export interface NFTItem {
  id: string;
  tokenId: string;
  title: string;
  price: string; // em ETH
  priceEth: number;
  category: 'art' | 'gaming' | 'collectibles' | 'music';
  featured?: boolean;
  image: string;
  rating: number;
  edition: string;
  collection: string;
  description: string;
  editions: string[];
}

export const MOCK_NFTS: NFTItem[] = [
  {
    id: 'emerald-ape-043',
    tokenId: '#0042',
    title: 'Emerald Ape #043',
    price: '1.19 ETH',
    priceEth: 1.19,
    image: heroMonkeyImage,
    edition: '1/50',
    collection: 'Kurio Apes',
    description:
      'Um colecionável digital finalizado à mão da coleção Kurio Editions, verificado na Ethereum, com arte desbloqueável e acesso para colecionadores.',
    editions: ['1/1', '1/10', '1/50', 'ABERTA'],
    category: 'collectibles',
    featured: true,
    rating: 5,
  },
  {
    id: 'violet-nomad-314',
    tokenId: '#0314',
    title: 'Violet Nomad #314',
    price: '1.39 ETH',
    priceEth: 1.39,
    image: heroMonkeyBlue,
    edition: '1/10',
    collection: 'Kurio Editions',
    description:
      'Uma expressão futurista com paleta violeta mística e acabamentos de alta raridade cunhada na rede Ethereum.',
    editions: ['1/1', '1/10', 'ABERTA'],
    category: 'art',
    featured: true,
    rating: 4.8,
  },
  {
    id: 'ivory-baron-088',
    tokenId: '#0088',
    title: 'Ivory Baron #088',
    price: '1.79 ETH',
    priceEth: 1.79,
    image: heroMonkeyBrow,
    edition: '1/1',
    collection: 'Kurio Barons',
    description:
      'Edição exclusiva e lendária com detalhes dourados e acabamento Marfim para grandes colecionadores.',
    editions: ['1/1', '1/5'],
    category: 'collectibles',
    featured: false,
    rating: 4.9,
  },
  {
    id: 'ivory-baron-098',
    tokenId: '#0088',
    title: 'Ivory Baron #098',
    price: '0.99 ETH',
    priceEth: 0.99,
    image: heroMonkeyBege,
    edition: '1/1',
    collection: 'Kurio Barons',
    description:
      'Edição exclusiva e lendária com detalhes dourados e acabamento Marfim para grandes colecionadores.',
    editions: ['1/1', '1/5'],
    category: 'music',
    featured: true,
    rating: 4.7,
  },
  {
    id: 'ivory-baron-148',
    tokenId: '#0088',
    title: 'Ivory Baron #148',
    price: '0.39 ETH',
    priceEth: 0.39,
    image: heroMonkeyBrow,
    edition: '1/1',
    collection: 'Kurio Barons',
    description:
      'Edição exclusiva e lendária com detalhes dourados e acabamento Marfim para grandes colecionadores.',
    editions: ['1/1', '1/5'],
    category: 'gaming',
    featured: false,
    rating: 4.5,
  },
];