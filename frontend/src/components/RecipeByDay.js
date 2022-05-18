import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RecipeByDay = ({ recipeIDs, mealPlanRecipes }) => {
  let mealArray = mealPlanRecipes;
  let navigate = useNavigate();
  const handleNav = () => {
    navigate(`/${recipeIDs}`);
  };
  return (
    <div>
      {mealArray &&
        mealArray.map(
          (meal) =>
            meal.id === recipeIDs && (
              <img onClick={handleNav} src={meal.image} />
            )
        )}
      <DisplayedRecipes>{recipeIDs}</DisplayedRecipes>
    </div>
  );
};

export default RecipeByDay;

const DisplayedRecipes = styled.div``;
