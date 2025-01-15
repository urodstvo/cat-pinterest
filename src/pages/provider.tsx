import { createContext, useContext } from 'react';

const FavoritesContext = createContext<{ id: string; cat_id: string }[]>([]);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  return <FavoritesContext.Provider value={}>{children}</FavoritesContext.Provider>;
};

export const useFavoritesStore = () => {
  const state = useContext(FavoritesContext);
  if (!state) throw new Error('useFavoritesStore must be used within a FavoritesProvider');

  return state;
};
