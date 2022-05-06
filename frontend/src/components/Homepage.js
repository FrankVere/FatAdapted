import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import LoginButton from "./Login";

const Homepage = () => {
  const {
    state: { allMeals },
  } = useContext(MealContext);
  return (
    <>
      <div>
        <h1>hello</h1>
        <LoginButton />
      </div>
      <div>
        {allMeals.map((meal) => {
          return <a href={meal.id}>{meal.title}</a>;
        })}
      </div>
    </>
  );
};

export default Homepage;
