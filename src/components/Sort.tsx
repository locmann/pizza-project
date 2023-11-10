import { useState } from "react";
import { SortType } from "../pages/Home";

type PropsType = {
  value: SortType;
  onClickSort: (value: SortType) => void;
  order: boolean;
  changeOrder: (b: boolean) => void;
};

export const Sort: React.FC<PropsType> = ({
  value,
  onClickSort,
  order,
  changeOrder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  //const [popupIndex, setPopupIndex] = useState(0);
  const sortPopup = [
    { name: "популярности", sortName: "rating" },
    { name: "цене", sortName: "price" },
    { name: "алфавиту", sortName: "title" },
  ];

  const setSort = (value: SortType) => {
    onClickSort(value);
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <div onClick={() => changeOrder(!order)}>
          {order ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V20M12 4L8 8M12 4L16 8"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V20M12 20L8 16M12 20L16 16"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{value.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortPopup.map((m, i) => (
              <li
                onClick={() => setSort(m)}
                key={i}
                className={value.name === m.name ? "active" : ""}
              >
                {m.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
