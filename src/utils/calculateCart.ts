import { PizzaCartType } from "../redux/slices/cartSlice";

export const calculateCart = (items: PizzaCartType[]) => {
  const price = items.reduce(
    (curSum, item) => item.price * item.count + curSum,
    0
  );
  return price;
};
