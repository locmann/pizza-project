import React from "react";
import { useState, useEffect } from "react";
import { PizzasType } from "../App";
import { Categories } from "../components/Categories";
import { Pizza } from "../components/Pizza";
import Skeleton from "../components/Skeleton";
import { Sort } from "../components/Sort";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { decrement, increment } from "../redux/slices/counterSlice";

export type SortType = {
  name: string;
  sortName: string;
};

export const Home = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const searchPizzas: string = useOutletContext();
  const [items, setItems] = useState<PizzasType>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pizzaCategories, setPizzaCategories] = useState(0);
  const [pizzaSort, setPizzaSort] = useState({
    name: "популярности",
    sortName: "rating",
  });
  const [order, setOrder] = useState(false);
  useEffect(() => {
    setIsLoaded(false);
    let url = `https://6548d469dd8ebcd4ab23b083.mockapi.io/items?${
      pizzaCategories > 0 ? `category=${pizzaCategories}` : ""
    }&sortBy=${pizzaSort.sortName}&order=${
      order ? "desc" : "asc"
    }&search=${searchPizzas}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setIsLoaded(true);
      });
    window.scrollTo(0, 0);
  }, [pizzaCategories, pizzaSort, order, searchPizzas]);
  return (
    <div className="container">
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div className="content__top">
        <Categories
          value={pizzaCategories}
          onClickCategory={(id: number) => setPizzaCategories(id)}
        />
        <Sort
          value={pizzaSort}
          onClickSort={(value: SortType) => setPizzaSort(value)}
          order={order}
          changeOrder={(b: boolean) => setOrder(b)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoaded
          ? items.map((m) => <Pizza key={m.id} {...m} />)
          : [...new Array(6)].map((_, i) => <Skeleton key={i} />)}
      </div>
    </div>
  );
};
