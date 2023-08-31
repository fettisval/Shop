import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import cartReducer from './cartSlice';
import itemReducer from './itemSlice';
import ratingsReducer from './ratingsSlice';
import {apiSlice} from './apiSlice';
export default configureStore({
    reducer: {
        login: loginReducer,
        cart: cartReducer,
        item: itemReducer,
        ratings: ratingsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});