import { createContext, useContext, useState } from 'react';

type AuthState = {
    isAuthenticated: boolean;
    token: string;
};

const AuthContext = createContext<AuthState>({
    isAuthenticated: false,
    token: '',
});

const SetAuthStateContext = createContext<React.Dispatch<React.SetStateAction<AuthState>>>(() => {});

const token = localStorage.getItem('access_token');

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>(
        !!token
            ? {
                  isAuthenticated: true,
                  token,
              }
            : { isAuthenticated: false, token: '' },
    );
    return (
        <SetAuthStateContext.Provider value={setAuthState}>
            <AuthContext.Provider
                value={{
                    isAuthenticated: authState.isAuthenticated,
                    token: authState.token,
                }}
            >
                {children}
            </AuthContext.Provider>
        </SetAuthStateContext.Provider>
    );
};

export const useAuthStore = () => {
    const authState = useContext(AuthContext);
    if (!authState) throw new Error('useAuthStore must be used within a AuthProvider');

    return authState;
};

export const useAuthActionsStore = () => {
    const state = useContext(SetAuthStateContext);
    if (!state) throw new Error('useAuthActionsStore must be used within a SetAuthStateProvider');

    return state;
};
