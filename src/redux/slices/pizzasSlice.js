import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (url) => {
  const { data } = await axios.get(url, {
    headers: { 'content-type': 'application/json' },
  });

  return data;
});

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      console.log(action, "fulfilled");
      state.items = action.payload;
      state.status = 'success';
    },

    [fetchPizzas.rejected]: (state, action) => {
      console.log(action, "rejected");
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizzasReducer;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;

