import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Container>
      <LinksWrapper>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/likedRecipes">Liked Recipes</NavLink>
        <NavLink to="/mealPlan">Meal Plan</NavLink>
      </LinksWrapper>
    </Container>
  );
};

const Container = styled.footer``;
const LinksWrapper = styled.div``;

export default Navbar;
