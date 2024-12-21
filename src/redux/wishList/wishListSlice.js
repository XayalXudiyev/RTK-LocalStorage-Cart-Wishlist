import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishListiItems: localStorage.getItem("wishList") ? JSON.parse(localStorage.getItem("wishList")) : []
}

export const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        addWishListItem: (state, action) => {
            let wishList = [...state.wishListiItems];

            if (wishList.includes(action.payload)) {
                wishList = wishList.filter((id) => id !== action.payload);
            } else {
                wishList.push(action.payload);
            }

            state.wishListiItems = wishList;

            localStorage.setItem("wishList", JSON.stringify(wishList));
        }
    }

})

export const { addWishListItem } = wishListSlice.actions
export default wishListSlice.reducer