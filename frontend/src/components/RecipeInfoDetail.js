import React, { useContext } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";

const RecipeInfoDetail = () => {
  const {
    state: { singleRecipeInfo, likedRecipes },
    actions: { updateLikedRecipes },
  } = useContext(MealContext);

  console.log("likedRecipes", likedRecipes);

  const likedHandler = () => {
    console.log("clicked");
    const newLikedRecipe = [...likedRecipes];
    updateLikedRecipes(newLikedRecipe.push(singleRecipeInfo.title));
    const userRecipes = localStorage.setItem("likedRecipes", likedRecipes);
  };
  return (
    <div>
      {singleRecipeInfo.title}
      <img src={singleRecipeInfo.image} />
      <button onClick={likedHandler}>Liked</button>
    </div>
  );
};

export default RecipeInfoDetail;
