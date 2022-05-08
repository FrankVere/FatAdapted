import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import { useParams } from "react-router-dom";
import RecipeInfoDetail from "./RecipeInfoDetail";
import { useAuth0 } from "@auth0/auth0-react";

const RecipeInfo = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const {
    actions: { getSingleRecipeInfo },
  } = useContext(MealContext);

  if (isAuthenticated && !isLoading) {
    console.log(user);
  }
  const {
    state: { singleRecipeInfo },
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
