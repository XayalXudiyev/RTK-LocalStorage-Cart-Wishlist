import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./product/productApi";
import productReducer from "./cart/cartSlice";
import wishListReducer from "./wishList/wishListSlice";

const store = configureStore({
    reducer: {
        // [productApi.reducerPath]: productApi.reducer,
        products: productApi.reducer,
        carts: productReducer,
        wishList: wishListReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
});

export default store;
