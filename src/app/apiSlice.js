import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_INTERNAL_CART_ID = '64d63f54ccbc3';
const API_INTERNAL_CART_GET = `https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`;
const API_GET_PRODUCTS_URL = 'https://dummyjson.com/products';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('user-token');
            if (token) {
                headers.set('Internship-Auth', token);
            }
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => {
                return `${API_GET_PRODUCTS_URL}?limit=${params.limit}&skip=${params.skip}`
            },
            serializeQueryArgs: ({endpointName}) => {
                return endpointName;
            },
            merge(currentCache, newItems) {
                currentCache.products.push(...newItems.products);
            },
            forceRefetch({currentArg, previousArg}) {
                if (previousArg !== undefined) {
                    return currentArg.skip !== previousArg.skip;
                }
                return false;
            }
        }),
        getProduct: builder.query({
            query: (id) => `${API_GET_PRODUCTS_URL}/${id}`,
        }),
        addProductToCart: builder.mutation({
            query: ({ id, quantity }) => ({
                url: `https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 1,
                    products: [{ id: id, quantity: quantity }],
                }),
            }),
        }),
        removeProductFromCart: builder.mutation({
            query: ({ id, quantity }) => ({
                url: `https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 1,
                    products: [{ id: id, quantity: quantity }],
                }),
            }),
        }),
        deleteProductFromCart: builder.mutation({
            query: (id) => ({
                url: `https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}?products[]=${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        initCartProducts: builder.query({
            query:  () => {
                return {
                url: API_INTERNAL_CART_GET,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }},
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/login',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductToCartMutation,
    useRemoveProductFromCartMutation,
    useDeleteProductFromCartMutation,
    useInitCartProductsQuery,
    useLoginMutation,
} = apiSlice;