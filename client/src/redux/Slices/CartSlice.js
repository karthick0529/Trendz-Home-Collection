import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push(action.payload);
        },

        remove: (state, action) => {
            return state.filter((p) => p.id !== action.payload);
        },

        clear: (state) => {
            return []; // Clear the cart by returning an empty array
        },
    },
});

export const { add, remove, clear } = CartSlice.actions;
export default CartSlice.reducer;
