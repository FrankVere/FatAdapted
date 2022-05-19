import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import MealList from "./MealList";
import RecipeRandomizer from "./RecipeRandomizer";

const Homepage = () => {
  const {
    actions: { getSingleRecipeInfo },
  } = useContext(MealContext);

  useEffect(() => {
    getSingleRecipeInfo({});
  }, []);

  return (
    <>
      <RecipeRandomizer />
      <MealList />
    </>
  );
};

export default Homepage;
