import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type FavoritesContextType = {
  favorites: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  add: () => {},
  remove: () => {},
});

const memoizedFavorites = JSON.parse(localStorage.getItem('favorites') ?? '[]') as string[];

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<string[]>(memoizedFavorites);

  const add = useCallback((id: string) => {
    setState((prev) => [...prev, id]);
  }, []);

  const remove = useCallback((id: string) => {
    setState((prev) => prev.filter((i) => i !== id));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state));
  }, [state]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state,
        add,
        remove,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesStore = () => {
  const state = useContext(FavoritesContext);
  if (!state) throw new Error('useFavoritesStore must be used within a FavoritesProvider');

  return state;
};
