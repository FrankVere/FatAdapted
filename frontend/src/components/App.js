import React, { useEffect, useContext, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MealContext } from "../MealContext";
import { useAuth0 } from "@auth0/auth0-react";
import Homepage from "./Homepage";
import RecipeInfo from "./RecipeInfo";
import Profile from "./Profile";
import HeaderBar from "./HeaderBar";
import Navbar from "./Navbar";
import LikedRecipes from "./LikedRecipes";
import MealPlan from "./MealPlan";
import GlobalStyles from "./GlobalStyles";

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

  useEffect(() => {
    const postUser = async () => {
      fetch("/post-user/", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
    };

    const updateHomepageRecipes = async () => {
      const query = await fetch(`/get-user-preferences/${user.email}`, {
        method: "GET",
      });
      await fetch(`/get-preference-recipes/?cuisine=${query.cuisine}`)
        .then((res) => res.json())
        .then((data) => {
          getAllMeals(data.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (isAuthenticated) {
      postUser();
      updateHomepageRecipes();
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <GlobalStyles />
        <HeaderBar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/:recipeName" element={<RecipeInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/likedRecipes" element={<LikedRecipes />} />
          <Route exact path="/mealPlan" element={<MealPlan />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
