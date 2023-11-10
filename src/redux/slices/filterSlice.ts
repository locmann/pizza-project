import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FilterState = {
  category: number;
};

const initialState: FilterState = {
  category: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
  },
});

export const { changeCategory } = filterSlice.actions;

export default filterSlice.reducer;
