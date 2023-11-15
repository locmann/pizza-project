import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeCategory } from "../redux/slices/filterSlice";

type PropsType = {
  value: number;
  /* onClickCategory: (id: number) => void; */
};

export const Categories: React.FC<PropsType> = ({ value }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const dispatch = useDispatch();
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => dispatch(changeCategory(index))}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
