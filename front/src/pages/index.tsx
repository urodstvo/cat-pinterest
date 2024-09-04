import { FAVORITES_PAGE_URL, HOME_PAGE_URL } from '@/shared/constants';
import { useLocation } from '@/shared/hooks';

import { HomePage } from './Home';
import { FavoritesPage } from './Favorites';
import { Error404Page } from './404Error';
import { Header } from '@/widget/Header';

export const Router = () => {
    const location = useLocation();
    if (location === HOME_PAGE_URL)
        return (
            <>
                <Header key="header" />
                <HomePage />
            </>
        );

    if (location === FAVORITES_PAGE_URL)
        return (
            <>
                <Header key="header" />
                <FavoritesPage />
            </>
        );

    return <Error404Page />;
};
