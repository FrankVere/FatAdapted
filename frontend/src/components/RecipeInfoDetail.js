import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import AddMealPlan from "./AddMealPlan";
import { useAuth0 } from "@auth0/auth0-react";

const RecipeInfoDetail = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isAuthenticated && !isLoading) {
    console.log(user);
  }
  const {
    state: { singleRecipeInfo },
  } = useContext(MealContext);

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

  //the .replace is used to remove the html tags included in the summary (ie, <br><ul> etc)

  return (
    <div>
      {Object.keys(singleRecipeInfo).length > 0 && (
        <>
          {" "}
          <StyledHeader>{singleRecipeInfo.title} </StyledHeader>
          <StyledSummary>
            {singleRecipeInfo.summary.replace(/(<([^>]+)>)/gi, "")}
          </StyledSummary>
          <RecipeImageWrapper>
            <StyledRecipeImage src={singleRecipeInfo.image} />
          </RecipeImageWrapper>
          <button onClick={handleLiked}>Liked</button>
          <AddMealPlan />
        </>
      )}
    </div>
  );
};

const StyledHeader = styled.h2`
  text-align: center;
`;
const StyledSummary = styled.p`
  text-align: center;
  text-decoration: none;
`;
const StyledRecipeImage = styled.img`
  width: 250px;
`;
const RecipeImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export default RecipeInfoDetail;
