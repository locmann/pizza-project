import { calculateCart } from "./calculateCart";

export const getDataFromLS = () => {
  const data = localStorage.getItem("cart");
  const boughtPizzas = data ? JSON.parse(data) : [];
  const cartPrice = calculateCart(boughtPizzas);

  return {
    boughtPizzas,
    cartPrice,
  };
};
