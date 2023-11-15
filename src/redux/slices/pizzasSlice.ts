import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SortObjType } from "./filterSlice";
import { PizzasType } from "../../App";

type ParamsType = {
  pizzaCategory: number;
  pizzaSort: SortObjType;
  order: boolean;
  searchPizzas: string;
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async (params: ParamsType) => {
    const { pizzaCategory, pizzaSort, order, searchPizzas } = params;
    let url = `https://6548d469dd8ebcd4ab23b083.mockapi.io/items?${
      pizzaCategory > 0 ? `category=${pizzaCategory}` : ""
    }&sortBy=${pizzaSort.sortName}&order=${
      order ? "desc" : "asc"
    }&search=${searchPizzas}`;
    const data = await axios.get(url);
    return data.data;
  }
);

type IniType = {
  items: PizzasType[];
  status: "pending" | "fulfilled";
};

const initialState: IniType = {
  items: [],
  status: "pending",
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzasType[]>) => {
      state.items = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzasType[]>) => {
        state.items = [...action.payload];
        state.status = "fulfilled";
      }
    );
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
