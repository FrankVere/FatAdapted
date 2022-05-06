import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import { useParams } from "react-router-dom";
import RecipeInfoDetail from "./RecipeInfoDetail";

const RecipeInfo = () => {
  const {
    actions: { getSingleRecipeInfo },
  } = useContext(MealContext);

  const { recipeName } = useParams();

  useEffect(() => {
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
  }, []);
  return (
    <div>
      <RecipeInfoDetail />
    </div>
  );
};

export default RecipeInfo;
