import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const {
    state: { allMeals },
  } = useContext(MealContext);

  return (
    <>
      <div>
        <h1>hello</h1>
        <LoginButton />
        <LogoutButton />
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div>
        {allMeals.map((meal) => {
          return <NavLink to={`/${meal.id}`}>{meal.title}</NavLink>;
        })}
      </div>
    </>
  );
};

export default Homepage;
