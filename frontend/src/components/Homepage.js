import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import MealList from "./MealList";
import RecipeRandomizer from "./RecipeRandomizer";

const Homepage = () => {
  return (
    <>
      <RecipeRandomizer />
      <MealList />
    </>
  );
};

export default Homepage;
