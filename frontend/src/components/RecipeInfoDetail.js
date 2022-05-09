import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import { useAuth0 } from "@auth0/auth0-react";

const RecipeInfoDetail = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isAuthenticated && !isLoading) {
    console.log(user);
  }
  const {
    state: { singleRecipeInfo },
  } = useContext(MealContext);
  console.log(user);
  const id = singleRecipeInfo.id;
  const userInfo = user.email;

  const handleLiked = () => {
    fetch("/post-liked-recipe/", {
      method: "POST",
      body: JSON.stringify({
        id,
        userInfo,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  return (
    <div>
      {singleRecipeInfo.title}
      <img src={singleRecipeInfo.image} />
      <button onClick={handleLiked}>Liked</button>
    </div>
  );
};

export default RecipeInfoDetail;
