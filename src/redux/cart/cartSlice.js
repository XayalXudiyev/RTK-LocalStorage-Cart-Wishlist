import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartsItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],

}

export const cartsSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {

        addToCart: (state, action) => {

            const isItemExist = state.cartsItems.find((i) => { i.id === action.payload.id })

            if (isItemExist) {
                isItemExist.quantity = isItemExist.quantity + 1
            } else {
                state.cartsItems.push(action.payload)
            }

            localStorage.setItem("cart", JSON.stringify(state.cartsItems))
        },
        clearCart: (state, action) => {
            state.cartsItems = []
            localStorage.setItem("cart", JSON.stringify(state.cartsItems))
        },
        removeItem: (state, action) => {
            const updateItem = state.cartsItems.filter((i) => i.id !== action.payload.id)

            state.cartsItems = updateItem
            localStorage.setItem("cart", JSON.stringify(state.cartsItems))

        }


    },
})


export const { addToCart, increaseQty, decreaseQty, removeItem, clearCart, calculateSubtotal } = cartsSlice.actions

export default cartsSlice.reducer