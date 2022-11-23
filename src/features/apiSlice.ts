import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';
import { IUser } from './authSlice';

export interface ICategory {
    id: number;
    name: string;
    image: string;
}

export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: ICategory;
    images: string[];
}

interface ILoginResponse {
    access_token: string;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.escuelajs.co/api/v1/',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => 'products',
        }),
        getProductById: builder.query<IProduct, number>({
            query: (productId: number) => `products/${productId}`,
        }),
        createProduct: builder.mutation<IProduct, { data: IProduct }>({
            query: ({ data }) => ({
                url: `products`,
                method: 'POST',
                body: data,
            }),
        }),
        getCategories: builder.query<ICategory[], void>({
            query: () => 'categories',
        }),
        getProductsByCategory: builder.query<ICategory[], number>({
            query: (categoryId: number) => `categories/${categoryId}/products`,
        }),
        getMyProfile: builder.query<IUser, any>({
            query: () => 'auth/profile',
        }),
        loginUser: builder.mutation<ILoginResponse, { data: Partial<IUser> }>({
            query: ({data}) => ({
                url: 'auth/login',
                method: 'POST',
                body: data,
            })
        }),
        registerUser: builder.mutation<IUser, { data: Partial<IUser> }>({
            query: ({data}) => ({
                url: 'users',
                method: 'POST',
                body: data,
            })
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useLoginUserMutation,
    useRegisterUserMutation,
    useGetMyProfileQuery,
} = api;

export default api;