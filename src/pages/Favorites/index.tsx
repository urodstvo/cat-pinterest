import { useTitle } from '@/hooks';
import { ImagesGrid } from '@/components/ImagesGrid';
import { useFavoritesStore } from '@/pages/provider';

export const FavoritesPage = () => {
  useTitle('Любимые - Кошачий пинтерест');
  const favorites = useFavoritesStore();

  return (
    <main>
      {!favorites.length && <p style={{ textAlign: 'center' }}>Ничего не найдено</p>}
      <ImagesGrid ids={favorites.map((id) => id.cat_id)} />
    </main>
  );
};
