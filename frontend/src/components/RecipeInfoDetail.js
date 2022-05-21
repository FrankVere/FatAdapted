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
    <WholeWrapper>
      {Object.keys(singleRecipeInfo).length > 0 && (
        <>
          {" "}
          <StyledHeader>{singleRecipeInfo.title} </StyledHeader>
          <RecipeImageWrapper>
            <StyledRecipeImage src={singleRecipeInfo.image} />
          </RecipeImageWrapper>
          <ButtonContainer>
            <AddMealPlan />
            <button className="buttonstyle-hover click" onClick={handleLiked}>
              Like
            </button>
          </ButtonContainer>
          <SummaryWrapper>
            <StyledSummary>
              {singleRecipeInfo.summary.replace(/(<([^>]+)>)/gi, "")}
            </StyledSummary>
          </SummaryWrapper>
        </>
      )}
    </WholeWrapper>
  );
};

const StyledHeader = styled.h2`
  text-align: center;
  font-size: 30px;
`;
const StyledSummary = styled.p`
  text-align: center;
  text-decoration: none;
`;
const StyledRecipeImage = styled.img`
  width: 300px;
  margin-bottom: 15px;
`;
const RecipeImageWrapper = styled.div`
  margin-left: 45px;
`;

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const SummaryWrapper = styled.div`
  border: 2px solid #e85a19;
  margin-top: 25px;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px #f5ce62;
  background-color: #fff;
`;

export default RecipeInfoDetail;
