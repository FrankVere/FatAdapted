import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import MealList from "./MealList";

const Homepage = () => {
  return (
    <>
      <MealList />
    </>
  );
};

export default Homepage;
