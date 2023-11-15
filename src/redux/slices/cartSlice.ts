import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type IniType = {
  boughtPizzas: PizzaCartType[];
  cartPrice: number;
  // totalPizzasCount: number
};

type PizzaCartType = {
  imageUrl: string;
  title: string;
  price: number;
  id: number;
  type: string;
  size: number;
  count: number;
};

const initialState: IniType = {
  boughtPizzas: [],
  cartPrice: 0,
  // totalPizzasCount: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<PizzaCartType>) => {
      const findItem = state.boughtPizzas.find(
        (obj) => obj.id === action.payload.id
      );

      if (findItem) {
        findItem.count += 1;
      } else {
        state.boughtPizzas.push(action.payload);
      }

      state.cartPrice = state.boughtPizzas.reduce(
        (curSum, item) => item.price * item.count + curSum,
        0
      );
    },
    removePizza: (state, action: PayloadAction<number>) => {
      const index = state.boughtPizzas.findIndex(
        (item) => action.payload === item.id
      );

      state.boughtPizzas.splice(index, 1);
      state.cartPrice = state.boughtPizzas.reduce(
        (curSum, item) => item.price * item.count + curSum,
        0
      );
    },
    increment: (state, action: PayloadAction<number>) => {
      const currentPizza = state.boughtPizzas.find(
        (item) => action.payload === item.id
      );
      if (currentPizza) {
        currentPizza.count += 1;
        state.cartPrice = state.boughtPizzas.reduce(
          (curSum, item) => item.price * item.count + curSum,
          0
        );
      }
    },
    decrement: (state, action: PayloadAction<number>) => {
      const currentPizza = state.boughtPizzas.find(
        (item) => action.payload === item.id
      );
      if (currentPizza?.count === 1) {
        const index = state.boughtPizzas.findIndex(
          (item) => action.payload === item.id
        );

        state.boughtPizzas.splice(index, 1);
      }
      if (currentPizza) {
        currentPizza.count -= 1;
        state.cartPrice = state.boughtPizzas.reduce(
          (curSum, item) => item.price * item.count + curSum,
          0
        );
      }
    },
    clear: (state) => {
      state.boughtPizzas = [];
      state.cartPrice = 0;
    },
  },
});

export const { addPizza, clear, removePizza, increment, decrement } =
  cartSlice.actions;

export default cartSlice.reducer;
