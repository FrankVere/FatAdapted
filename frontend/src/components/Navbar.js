import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { BiCalendarPlus, BiHomeCircle, BiHeart } from "react-icons/bi";

const Navbar = () => {
  return (
    <>
      <Container>
        <ul className="nav-buttons">
          <li className="nav-list">
            <NavLink to="/" className="nav-links">
              <BiHomeCircle />
              &nbsp; Home
            </NavLink>
            <NavLink to="/likedRecipes" className="nav-links">
              <BiHeart />
              &nbsp; Liked Recipes
            </NavLink>
            <NavLink to="/mealPlan" className="nav-links">
              <BiCalendarPlus />
              &nbsp; Meal Plan
            </NavLink>
            <NavLink to="/profile" className="nav-links">
              <CgProfile />
              &nbsp; Profile
            </NavLink>
          </li>
        </ul>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  position: fixed;
  bottom: 0;
  background-color: #333;
`;

export default Navbar;
