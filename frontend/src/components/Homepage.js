import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import MealList from "./MealList";
import cookingFam from "../images/cookingFam.jpg";
import RecipeRandomizer from "./RecipeRandomizer";

const Homepage = () => {
  const {
    actions: { getSingleRecipeInfo },
    loadingRecipes,
  } = useContext(MealContext);

  useEffect(() => {
    getSingleRecipeInfo({});
  }, []);

  return (
    <>
      {" "}
      {loadingRecipes ? (
        <SpinnerWrapper>
          <div className="lds-hourglass" />
          <div style={{ fontStyle: "italic" }}>
            Loading your preferred recipes...
          </div>
        </SpinnerWrapper>
      ) : (
        <div>
          <img src={cookingFam} style={{ width: "390px" }} />
          <Container>
            <RecipeRandomizer />
            <MealList />
          </Container>
        </div>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const SpinnerWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 20%;
  text-align: center;
`;
export default Homepage;
