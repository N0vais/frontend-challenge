import React from 'react';
import { useNavigate } from '@tanstack/react-router';

// Coleção/Perfis dos Criadores
export interface Creator {
  id: string;
  name: string;
  role: string;
  ens: string;
  bio: string;
  avatar: string;
  featuredNftTitle: string;
  featuredNftImage: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export const CREATORS_DATA: Creator[] = [
  {
    id: 'nova-sato',
    name: 'Nova Sato',
    role: 'Artista Visual & Fundadora',
    ens: 'novasato.eth',
    bio: 'Pioneira em arte digital generativa e colecionáveis 3D finamente esculpidos. Suas obras exploram a união entre formas orgânicas, estética cyberpunk e coleções de raridade imutável na rede Ethereum.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    featuredNftTitle: 'Emerald Ape #043',
    featuredNftImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    socials: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: 'alexander-vance',
    name: 'Alexander Vance',
    role: 'Engenheiro de Smart Contracts',
    ens: 'vance.eth',
    bio: 'Arquiteto de protocolos descentralizados e especialista em otimização de gas ERC-721/1155. Focado em garantir a veracidade, procedência imutável e distribuição transparente de royalties para artistas.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    featuredNftTitle: 'Violet Nomad #314',
    featuredNftImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
    socials: {
      twitter: '#',
      github: '#',
    },
  },
  {
    id: 'elena-rodriguez',
    name: 'Elena Rodriguez',
    role: 'Designer UI/UX & Diretora Criativa',
    ens: 'elena.xyz',
    bio: 'Especialista em interfaces imersivas para a Web3, unindo estética brutalista moderna com interatividade acessível para colecionadores e criadores de NFTs ao redor do mundo.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80',
    featuredNftTitle: 'Ivory Baron #088',
    featuredNftImage: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=600&q=80',
    socials: {
      twitter: '#',
      linkedin: '#',
    },
  },
];

export const AboutCreatorsSection: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreMarket = () => {
    navigate({
      to: '/',
      search: (old: { search?: string; category?: string; view?: string }) => ({
        ...old,
        view: 'mercado' as const,
      }),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[#0F0C08] min-h-screen text-[#F3E5D8] font-mono py-12 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto space-y-16">
        
        {/* ================= BREADCRUMB & CABEÇALHO DA PÁGINA ================= */}
        <div className="space-y-4">
          <div className="text-xs text-[#A89F91]">
            <span>Início</span> <span className="mx-2">/</span>{' '}
            <span className="text-[#D28A4C]">Sobre os Criadores</span>
          </div>

          <div className="border-b border-[#261E17] pb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide uppercase mb-3">
              Conheça as Mentes Por Trás do <span className="text-[#D28A4C]">Kurio</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#A89F91] font-sans leading-relaxed max-w-3xl">
              Somos uma guilda de artistas digitais, desenvolvedores blockchain e designers dedicados a redefinir a experiência de colecionar arte única na Web3.
            </p>
          </div>
        </div>

        {/* ================= MANIFESTO / VISÃOGgeral ================= */}
        <div className="bg-[#1A1510] border border-[#261E17] rounded-2xl p-6 sm:p-10 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D28A4C]/5 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-sm font-bold text-[#D28A4C] uppercase tracking-wider">
            Nossa Missão & Visão
          </h2>
          <p className="text-xs sm:text-sm text-[#F3E5D8] font-sans leading-relaxed">
            No ecossistema Kurio, acreditamos que a tecnologia blockchain é mais do que um livro de registros imutável — é uma nova tela para a expressão criativa. Cada artefato cunhado em nossa plataforma combina estética refinada, utilidade real e preservação contínua no IPFS e Ethereum.
          </p>
        </div>

        {/* ================= GRADE DE CRIADORES ================= */}
        <div className="space-y-8">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider border-l-2 border-[#D28A4C] pl-3">
            Criadores em Destaque
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CREATORS_DATA.map((creator) => (
              <div
                key={creator.id}
                className="bg-[#1A1510] border border-[#261E17] hover:border-[#D28A4C]/50 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 group"
              >
                {/* Perfil do Criador */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#261E17] group-hover:border-[#D28A4C] transition-colors shrink-0">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#D28A4C] transition-colors">
                        {creator.name}
                      </h3>
                      <p className="text-xs text-[#A89F91]">{creator.role}</p>
                      <span className="inline-block mt-1 text-[11px] font-bold text-[#D28A4C] bg-[#D28A4C]/10 px-2.5 py-0.5 rounded-full border border-[#D28A4C]/20">
                        {creator.ens}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#A89F91] font-sans leading-relaxed">
                    {creator.bio}
                  </p>
                </div>

                {/* Obra de Destaque do Criador */}
                <div className="space-y-2 pt-4 border-t border-[#261E17]">
                  <span className="text-[10px] text-[#A89F91] uppercase tracking-wider block">
                    Obra de Destaque:
                  </span>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0F0C08] border border-[#261E17]">
                    <img
                      src={creator.featuredNftImage}
                      alt={creator.featuredNftTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C08] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-2 left-3 text-xs font-bold text-white">
                      {creator.featuredNftTitle}
                    </span>
                  </div>
                </div>

                {/* Redes Sociais e Ações */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3 text-[#A89F91]">
                    {creator.socials.twitter && (
                      <a
                        href={creator.socials.twitter}
                        aria-label="X (Twitter)"
                        className="hover:text-[#D28A4C] transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                    {creator.socials.linkedin && (
                      <a
                        href={creator.socials.linkedin}
                        aria-label="LinkedIn"
                        className="hover:text-[#D28A4C] transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.49 1.49 0 1 0 0 2.98 1.49 1.49 0 0 0 0-2.98z" />
                        </svg>
                      </a>
                    )}
                    {creator.socials.github && (
                      <a
                        href={creator.socials.github}
                        aria-label="GitHub"
                        className="hover:text-[#D28A4C] transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                        </svg>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleExploreMarket}
                    className="bg-[#261E17] hover:bg-[#3D3024] text-[#F3E5D8] hover:text-[#D28A4C] text-xs font-bold py-2 px-4 rounded-lg transition-all cursor-pointer uppercase"
                  >
                    Ver Obras
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CALL TO ACTION (ENTRE EM CONTATO) ================= */}
        <div className="border-t border-[#261E17] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-1">
              Quer colaborar como criador?
            </h3>
            <p className="text-xs text-[#A89F91] font-sans">
              Estamos sempre abertos a novos talentos da comunidade digital.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExploreMarket}
            className="bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xs py-3 px-8 rounded-lg transition-all cursor-pointer uppercase active:scale-95 shrink-0"
          >
            Explorar Coleção
          </button>
        </div>

      </div>
    </section>
  );
};