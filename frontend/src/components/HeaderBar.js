import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const HeaderBar = () => {
  return (
    <Container>
      <LinksWrapper>
        <NavLink to="/profile">Profile</NavLink>
        <LoginButton />
        <LogoutButton />
      </LinksWrapper>
    </Container>
  );
};

const Container = styled.header``;
const LinksWrapper = styled.div``;

export default HeaderBar;
