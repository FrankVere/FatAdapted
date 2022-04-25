import React, { useEffect, useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Recipes from "./Recipes";
import { MealContext } from "../MealContext";
import Homepage from "./Homepage";

function App() {
  const {
    actions: { getAllMeals },
  } = useContext(MealContext);

  useEffect(() => {
    fetch("/get-recipes/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getAllMeals(data.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exacth path="/" element={<Homepage />} />
          <Route exact path="/recipes" element={<Recipes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
