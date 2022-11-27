import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from '../features/apiSlice';
import authReducer from '../features/authSlice';
import cartSlice from '../features/cartSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage
};

const persistedCart = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
        cart: persistedCart,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
