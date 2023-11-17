import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { PizzasType } from "../App";
import { Categories } from "../components/Categories";
import { Pizza } from "../components/Pizza";
import Skeleton from "../components/Skeleton";
import { Sort } from "../components/Sort";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import axios from "axios";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

export type SortType = {
  name: string;
  sortName: string;
};

export const Home = () => {
  const pizzaCategory = useSelector(
    (state: RootState) => state.filter.category
  );
  const pizzaSort = useSelector((state: RootState) => state.filter.sortObj);
  const searchPizzas: string = useOutletContext();

  const [order, setOrder] = useState(false);
  const dispatch = useAppDispatch();
  const { items, status } = useSelector((state: RootState) => state.pizzas);
  const getPizzas = async () => {
    dispatch(fetchPizzas({ pizzaCategory, pizzaSort, order, searchPizzas }));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [pizzaCategory, pizzaSort, order, searchPizzas]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={pizzaCategory} />
        <Sort
          value={pizzaSort}
          order={order}
          changeOrder={(b: boolean) => setOrder(b)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {status === "fulfilled"
          ? items.map((m) => <Pizza key={m.id} {...m} />)
          : [...new Array(6)].map((_, i) => <Skeleton key={i} />)}
      </div>
    </div>
  );
};
