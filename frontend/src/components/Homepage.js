import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const {
    state: { allMeals },
  } = useContext(MealContext);

  return (
    <>
      <div>
        {allMeals.map((meal) => {
          return <NavLink to={`/${meal.id}`}>{meal.title}</NavLink>;
        })}
      </div>
    </>
  );
};

export default Homepage;
