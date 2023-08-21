import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], string>(
  "pizzas/fetchPizzasStatus",
  async (url) => {
    const { data } = await axios.get<Pizza[]>(url, {
      headers: { "content-type": "application/json" },
    });

    return data;
  }
);
