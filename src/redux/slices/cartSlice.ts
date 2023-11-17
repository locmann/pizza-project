import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDataFromLS } from "../../utils/getDataFromLS";
import { calculateCart } from "../../utils/calculateCart";

type IniType = {
  boughtPizzas: PizzaCartType[];
  cartPrice: number;
  // totalPizzasCount: number
};

export type PizzaCartType = {
  imageUrl: string;
  title: string;
  price: number;
  id: number;
  type: string;
  size: number;
  count: number;
};

const { boughtPizzas, cartPrice } = getDataFromLS();

const initialState: IniType = {
  boughtPizzas,
  cartPrice,
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
      state.cartPrice = calculateCart(
        state.boughtPizzas
      ); /* state.boughtPizzas.reduce(
        (curSum, item) => item.price * item.count + curSum,
        0
      ); */
    },
    removePizza: (state, action: PayloadAction<number>) => {
      const index = state.boughtPizzas.findIndex(
        (item) => action.payload === item.id
      );

      state.boughtPizzas.splice(index, 1);
      state.cartPrice = calculateCart(
        state.boughtPizzas
      ); /* state.boughtPizzas.reduce(
        (curSum, item) => item.price * item.count + curSum,
        0
      ); */
    },
    increment: (state, action: PayloadAction<number>) => {
      const currentPizza = state.boughtPizzas.find(
        (item) => action.payload === item.id
      );
      if (currentPizza) {
        currentPizza.count += 1;
        state.cartPrice = calculateCart(
          state.boughtPizzas
        ); /* state.boughtPizzas.reduce(
          (curSum, item) => item.price * item.count + curSum,
          0
        ); */
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
        state.cartPrice = calculateCart(
          state.boughtPizzas
        ); /* state.boughtPizzas.reduce(
          (curSum, item) => item.price * item.count + curSum,
          0
        ); */
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

export const selectCartItem = (state: RootState) => state.cart.boughtPizzas;

export default cartSlice.reducer;
