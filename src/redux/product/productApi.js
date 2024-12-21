import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "/products"
        }),
        getProduct: builder.query({
            query: (id) => `/products/${id}`
        })
    })
})

export const { useGetAllProductsQuery, useGetProductQuery } = productApi