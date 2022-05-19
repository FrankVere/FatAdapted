import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import MealPlanDay from "./MealPlanDay";
import { MealContext } from "../MealContext";

const MealPlan = () => {
  const { user, isLoading } = useAuth0();
  const userInfo = user.email;
  const [mealPlanRecipes, setMealPlanRecipes] = useState();

  const {
    state: { mealPlanRecipeIDs },
    actions: { getMealPlanRecipeIDs },
  } = useContext(MealContext);

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
    getMealPlanRecipeIDs(recipeIDs);
    const flatRecipeIds = Array.prototype.concat.apply([], recipeIDs.data);

    const getRecipes = await fetch(
      `https://api.spoonacular.com/recipes/informationBulk?includeNutrition=true&ids=${flatRecipeIds.toString()}&apiKey=${
        process.env.REACT_APP_SPOONACULAR_API_KEY
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const mealPlanRecipes = await getRecipes.json();
    setMealPlanRecipes(mealPlanRecipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  console.log(mealPlanRecipeIDs);

  return (
    <StyledWrapper>
      {mealPlanRecipeIDs.data &&
        mealPlanRecipeIDs.data.map((day, index) => {
          return (
            <MealPlanWrapper>
              <MealPlanDay
                mealPlanRecipes={mealPlanRecipes}
                recipeIDs={day}
                index={index}
              />
            </MealPlanWrapper>
          );
        })}
    </StyledWrapper>
  );
};

export default MealPlan;

const StyledWrapper = styled.div``;
const MealPlanWrapper = styled.div``;
