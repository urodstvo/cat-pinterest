import { useTitle } from '@/hooks';
import { ImagesGrid } from '@/components/images-grid';
import { useFavoritesStore } from '@/pages/provider';

export const FavoritesPage = () => {
  useTitle('Любимые - Кошачий пинтерест');
  const { favorites } = useFavoritesStore();

  return (
    <main>
      {!favorites.length && <p style={{ textAlign: 'center', padding: '48px 0' }}>Ничего не найдено</p>}
      <ImagesGrid data={favorites} />
    </main>
  );
};
