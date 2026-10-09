import React from 'react';

// Substitua pelas imagens dos seus ativos
import heroMonkeyImage from '@/assets/monkey-hero.png';
import heroMonkeyBlue from '@/assets/monkey-blue.png';
import heroMonkeyBrow from '@/assets/monkey-brow.png';
import heroMonkeyBege from '@/assets/monkey-bege.png';

interface Article {
  id: number;
  date: string;
  readTime: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const ARTICLES_DATA: Article[] = [
  {
    id: 1,
    date: '12 de setembro',
    readTime: 'Leitura de 6 min',
    title: 'Como funciona a propriedade de NFTs',
    description: 'Aprenda a colecionar, negociar e verificar ativos digitais.',
    image: heroMonkeyImage ,
    link: '#',
  },
  {
    id: 2,
    date: '13 de setembro',
    readTime: 'Leitura de 2 min',
    title: '10 artistas digitais para acompanhar',
    description: 'Conheça criadores que moldam a cultura digital.',
    image: heroMonkeyBlue,
    link: '#',
  },
  {
    id: 3,
    date: '15 de setembro',
    readTime: 'Leitura de 3 min',
    title: 'Raridade, atributos e procedência',
    description: 'Entenda raridade, procedência, direitos autorais e utilidade.',
    image: heroMonkeyBrow,
    link: '#',
  },
  {
    id: 4,
    date: '15 de setembro',
    readTime: 'Leitura de 2 min',
    title: 'Como proteger sua carteira',
    description: 'Proteja sua carteira, seus ativos e sua identidade.',
    image: heroMonkeyBege,
    link: '#',
  },
];

export const MintJournalSection: React.FC = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-6 py-16 font-mono">
      {/* Cabeçalho da Secção Centralizado */}
      <div className="text-center mb-12">
        <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase mb-3">
          Diário da Cunhagem
        </h2>
        <p className="text-[#A89F91] text-xs sm:text-sm font-sans max-w-2xl mx-auto tracking-wide">
          Histórias, guias e insights para colecionadores sobre o universo da propriedade digital.
        </p>
      </div>

      {/* Grelha de 4 Artigos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ARTICLES_DATA.map((article) => (
          <article
            key={article.id}
            className="bg-[#241612] border border-[#261E17] rounded-[5px] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#3D3024] hover:scale-[1.02] cursor-pointer"
          >
            {/* Imagem do Artigo */}
            <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#140D0A]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Conteúdo do Artigo */}
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                {/* Data | Tempo de Leitura */}
                <div className="text-[11px] text-[#A89F91] mb-3 flex items-center gap-1.5 tracking-wider">
                  <span>{article.date}</span>
                  <span className="text-[#3D3024]">|</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Título */}
                <h3 className="text-[#F3E5D8] font-bold text-sm leading-snug mb-3 tracking-wide group-hover:text-[#D28A4C] transition-colors">
                  {article.title}
                </h3>

                {/* Descrição */}
                <p className="text-[#A89F91] text-xs leading-relaxed font-sans mb-6">
                  {article.description}
                </p>
              </div>

              {/* Botão / Link "Ler mais" */}
              <div className="pt-2">
                <a
                  href={article.link}
                  className="text-[#D28A4C] hover:text-[#E5B484] text-xs font-bold inline-flex items-center gap-1 transition-all group-hover:translate-x-1"
                >
                  <span>Ler mais</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};