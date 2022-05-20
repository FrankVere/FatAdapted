import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import MealList from "./MealList";
import RecipeRandomizer from "./RecipeRandomizer";

const Homepage = () => {
  const {
    actions: { getSingleRecipeInfo },
    loadingRecipes,
  } = useContext(MealContext);

  useEffect(() => {
    getSingleRecipeInfo({});
  }, []);

  console.log(loadingRecipes);

  return (
    <>
      {" "}
      {loadingRecipes && "hi"}
      {/* <RecipeRandomizer /> */}
      <Container>
        <MealList />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  // justify-content: center;
`;

export default Homepage;
