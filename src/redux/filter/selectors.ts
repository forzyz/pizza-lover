import { RootState } from "../store";

export const selectFilter = (state: RootState) => state.filterReducer;
export const selectSort = (state: RootState) => state.filterReducer.sort;
