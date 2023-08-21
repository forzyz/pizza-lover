import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "./types";
import { getCartFromLS } from "../../components/utils/getCartFromLS";
import { calcTotalPrice } from "../../components/utils/calcTotalPrice";
import { calcTotalCount } from "../../components/utils/calcTotalCount";

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);

      state.totalCount = calcTotalCount(state.items);
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);

      state.totalCount = calcTotalCount(state.items);
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.type !== action.payload.type ||
          obj.size !== action.payload.size
      );

      state.totalPrice = calcTotalPrice(state.items);

      state.totalCount = calcTotalCount(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
