import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import { useParams } from "react-router-dom";
import RecipeInfoDetail from "./RecipeInfoDetail";
import { useAuth0 } from "@auth0/auth0-react";

const RecipeInfo = () => {
  const {
    actions: { getSingleRecipeInfo },
  } = useContext(MealContext);

  const {
    state: { singleRecipeInfo },
  } = useContext(MealContext);

  const { recipeName } = useParams();

  const _id = singleRecipeInfo.id;

  const [imgSrc, setImgSrc] = useState("");
  const [ingredientImgSrc, setIngredientImgSrc] = useState("");

  const getSingleRecipe = () => {
    fetch(`/get-single-recipe-info/${recipeName}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getSingleRecipeInfo(data.data);
      });
  };

  const getNutritonLabel = () => {
    fetch(
      `https://api.spoonacular.com/recipes/${_id}/nutritionLabel.png?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "image/png",
        },
      }
    ).then((data) => {
      setImgSrc(data.url);
    });
  };

  const getIngredientsImages = () => {
    fetch(
      `https://api.spoonacular.com/recipes/${_id}/ingredientWidget.png?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`,
      {
        method: "GET",
        headers: {
          Accept: "image/png",
          "Content-Type": "image/png",
        },
      }
    ).then((data) => {
      setIngredientImgSrc(data.url);
    });
  };

  useEffect(() => {
    getSingleRecipe();
    getNutritonLabel();
    getIngredientsImages();
  }, [_id]);

  return (
    <div>
      <RecipeInfoDetail />
      <img src={imgSrc} />
      <img src={ingredientImgSrc} />
    </div>
  );
};

export default RecipeInfo;
