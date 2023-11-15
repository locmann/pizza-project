import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FilterState = {
  category: number;
  //sortName: string;
  sortObj: SortObjType;
};

export type SortObjType = {
  sortName: string;
  name: string;
};

const initialState: FilterState = {
  category: 0,
  //sortName: "rating",
  sortObj: {
    sortName: "rating",
    name: "популярности",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    changeSort: (state, action: PayloadAction<SortObjType>) => {
      state.sortObj = { ...action.payload };
    },
  },
});

export const { changeCategory, changeSort } = filterSlice.actions;

export default filterSlice.reducer;
