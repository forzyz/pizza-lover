import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cartReducer;

export const selectCartItems = (state: RootState) => state.cartReducer.items;
