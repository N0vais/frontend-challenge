/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (nftId: string) => void;
  isFavorite: (nftId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('nft_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nft_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (nftId: string) => {
    setFavorites((prev) =>
      prev.includes(nftId) ? prev.filter((id) => id !== nftId) : [...prev, nftId]
    );
  };

  const isFavorite = (nftId: string) => favorites.includes(nftId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  }
  return context;
};