import { FAVORITES_PAGE_URL, HOME_PAGE_URL } from '@/shared/constants';
import { useLocation } from '@/shared/hooks';
import { Header } from '@/widget/Header';

import { HomePage } from './Home';
import { FavoritesPage } from './Favorites';
import { Error404Page } from './404Error';

const routes = [HOME_PAGE_URL, FAVORITES_PAGE_URL];

export const Router = () => {
    const location = useLocation();

    if (!routes.includes(location)) return <Error404Page />;

    return (
        <>
            <Header />
            {location === HOME_PAGE_URL && <HomePage />}
            {location === FAVORITES_PAGE_URL && <FavoritesPage />}
        </>
    );
};
