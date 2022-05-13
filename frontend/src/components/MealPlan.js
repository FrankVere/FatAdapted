import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const MealPlan = () => {
  const { user, isLoading } = useAuth0();
  const userInfo = user.email;
  const [mealPlanIds, setMealPlanIds] = useState();
  const [mealPlanRecipes, setMealPlanRecipes] = useState();

  const fetchRecipes = async () => {
    const getMealPlanID = await fetch(`/get-meal-plan/`, {
      method: "POST",
      body: JSON.stringify({ userInfo }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    const recipeIDs = await getMealPlanID.json();
    const flatRecipeIds = Array.prototype.concat.apply([], recipeIDs.data);

    setMealPlanIds(flatRecipeIds.toString());
    console.log("hidere", flatRecipeIds);

    if (mealPlanIds) {
      const getRecipes = await fetch(
        `https://api.spoonacular.com/recipes/informationBulk?includeNutrition=true&ids=${mealPlanIds}=true&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const mealPlanRecipes = await getRecipes.json();
      setMealPlanRecipes(mealPlanRecipes);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [mealPlanIds]);

  console.log(mealPlanRecipes);

  return <div>Meal Plan!</div>;
};

export default MealPlan;
