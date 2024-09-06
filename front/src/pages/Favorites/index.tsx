import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { authRequest } from '@/shared/api/';
import { useTitle } from '@/shared/hooks';
import { ImagesGrid } from '@/widget/ImagesGrid';
import { useAuthStore, useFavoritesStore } from '@/components/Provider';
import { AuthResponse } from '@/shared/types';
import { Input, Button } from '@/shared/ui';

import styles from './favorites.module.css';

type Inputs = {
    login: string;
    password: string;
};

const UnAuthorizedPage = () => {
    const mutation = useMutation({
        mutationFn: async (variables: { login: string; password: string }) => {
            const res = await authRequest(variables.login, variables.password);
            if (!res.ok) throw new Error('Invalid input');

            const token = res.headers.get('X-Auth-Token') || '';
            localStorage.setItem('access_token', token);

            return (await res.json()) as AuthResponse;
        },
        onSuccess: () => {
            location.reload();
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        reValidateMode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => mutation.mutate(data);

    return (
        <main>
            <h2 className={styles.Title}>Войдите в аккаунт, если хотите сохранить своих любимчиков</h2>
            {mutation.isError && <p className={styles.FormError}>Произошла ошибка при входе в аккаунт.</p>}
            <div className={styles.FormContainer}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
                    <div className={styles.FormInput}>
                        <label htmlFor="cat-pinteres-login">Логин</label>
                        <Input
                            {...register('login', { required: true, minLength: 3 })}
                            id="cat-pinteres-login"
                            autoFocus
                        />
                        {errors.login && <span>Логин должен быть не короче 3 символов</span>}
                    </div>

                    <div className={styles.FormInput}>
                        <label htmlFor="cat-pinteres-password">Пароль</label>
                        <Input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            id="cat-pinteres-password"
                        />
                        {errors.password && <span>Пароль должен быть не короче 6 символов</span>}
                    </div>

                    <Button>Получить моих любимчиков</Button>
                </form>
            </div>
        </main>
    );
};

const AuthorizedPage = () => {
    const favorites = useFavoritesStore();

    return (
        <main>
            {!favorites.length && <p style={{ textAlign: 'center' }}>Ничего не найдено</p>}
            <ImagesGrid ids={favorites.map((id) => id.cat_id)} />
        </main>
    );
};

export const FavoritesPage = () => {
    useTitle('Favorites - Cat Pinterest');
    const store = useAuthStore();

    if (!store.isAuthenticated) return <UnAuthorizedPage />;
    return <AuthorizedPage />;
};
