import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './AuthProvider';
import { FavoritesProvider } from './FavoritesProvider';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 3,
            staleTime: 60 * 30,
        },
        mutations: {
            retry: 1,
        },
    },
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <FavoritesProvider>{children}</FavoritesProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export { useAuthStore, useAuthActionsStore } from './AuthProvider';
export { useFavoritesStore } from './FavoritesProvider';
