import React, { useEffect, useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Recipes from "./Recipes";
import { MealContext } from "../MealContext";
import Homepage from "./Homepage";
import RecipeInfo from "./RecipeInfo";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

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

  if (isAuthenticated) {
    fetch("/post-user/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/:recipeName" element={<RecipeInfo />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
