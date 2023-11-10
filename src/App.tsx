import "./App.css";
import { Header } from "./components/Header";
import "./scss/app.scss";
import pizzas from "./assets/pizzas.json"; //кринж
import { Home } from "./pages/Home";
import { Outlet, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

export type PizzasType = typeof pizzas;
type ContextType = {
  searchPizzas: string;
  setSearchPizzas: React.Dispatch<React.SetStateAction<string>>;
};
const defaultContextValue: ContextType = {
  searchPizzas: "",
  setSearchPizzas: () => {},
};
export const SearchContext = createContext(defaultContextValue);

function App() {
  const [searchPizzas, setSearchPizzas] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchPizzas, setSearchPizzas }}>
        <Header />
        <div className="content">
          <Outlet context={searchPizzas} />
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
