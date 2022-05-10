import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LikedRecipes = () => {
  const { user } = useAuth0();
  const userInfo = user.email;

  const [likedRecipeIds, setLikedRecipeIds] = useState();

  const [allLikedRecipes, setAllLikedRecipes] = useState();

  const fetchRecipes = async () => {
    const getRecipeID = await fetch(`/get-liked-recipes/${userInfo}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    const recipeIDs = await getRecipeID.json();

    setLikedRecipeIds(recipeIDs.data.toString());

    if (likedRecipeIds) {
      const getRecipes = await fetch(
        `https://api.spoonacular.com/recipes/informationBulk?includeNutrition=true&ids=${likedRecipeIds}=true&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const likedRecipes = await getRecipes.json();
      setAllLikedRecipes(likedRecipes);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [likedRecipeIds]);

  console.log(allLikedRecipes);

  return (
    <div>
      <h1>My Liked Recipes!</h1>
    </div>
  );
};

export default LikedRecipes;
