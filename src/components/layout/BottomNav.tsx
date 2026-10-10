import React from 'react';
import { Link, useSearch } from '@tanstack/react-router';

export const BottomNav: React.FC = () => {
    const search = useSearch({ strict: false }) as { view?: string };
    const currentView = search?.view || 'home';

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none flex justify-center">
            <nav className="pointer-events-auto relative w-full bg-[#241612] border-t border-[#3D2817] px-6 py-3 flex items-center justify-between rounded-t-3xl shadow-2xl">

                {/* Início */}
                <Link
                    to="/"
                    search={(prev: Record<string, unknown>) =>
                        ({ ...prev, view: undefined }) as unknown as Record<string, string | undefined>
                    }
                    className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-colors ${currentView === 'home' ? 'text-[#D28A4C]' : 'text-[#A89F91] hover:text-[#F3E5D8]'
                        }`}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10.707 2.293a1 1 0 011.414 0l8 8a1 1 0 01-1.414 1.414L20 11.414V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-4h-2v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-8.586l-.293.293a1 1 0 01-1.414-1.414l8-8z" />
                    </svg>
                </Link>

                {/* Favoritos */}
                <Link
                    to="/"
                    search={(prev: Record<string, unknown>) =>
                        ({ ...prev, view: 'favoritos' }) as unknown as Record<string, string | undefined>
                    }
                    className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-colors ${currentView === 'favoritos' ? 'text-[#D28A4C]' : 'text-[#A89F91] hover:text-[#F3E5D8]'
                        }`}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </Link>

                {/* BOTÃO CENTRAL ELEVADO (Scanner / Ação Principal) */}
                <div className="relative -top-6 z-10">
                    <button
                        type="button"
                        aria-label="Escanear NFT"
                        className="w-14 h-14 rounded-full bg-[#D28A4C] text-[#0F0C08] flex items-center justify-center shadow-lg shadow-[#D28A4C]/30 border-4 border-[#0F0C08] active:scale-95 transition-transform cursor-pointer"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                {/* Carrinho de Compras */}
                <Link
                    to="/"
                    search={(prev: Record<string, unknown>) =>
                        ({ ...prev, view: 'carrinho' }) as unknown as Record<string, string | undefined>
                    }
                    className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-colors ${currentView === 'carrinho' ? 'text-[#D28A4C]' : 'text-[#A89F91] hover:text-[#F3E5D8]'
                        }`}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 25 25">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                </Link>

                {/* Perfil de Usuário */}
                <Link
                    to="/"
                    search={(prev: Record<string, unknown>) =>
                        ({ ...prev, view: 'perfil' }) as unknown as Record<string, string | undefined>
                    }
                    className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-colors ${currentView === 'perfil' ? 'text-[#D28A4C]' : 'text-[#A89F91] hover:text-[#F3E5D8]'
                        }`}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </Link>

            </nav>
        </div>
    );
};