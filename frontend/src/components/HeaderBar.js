import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../images/logo.png";

const HeaderBar = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Container>
      <LogoStyled src={logo} />
      <LinksWrapper>
        {" "}
        {user && isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </LinksWrapper>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #333;
  height: 35px;
  color: white;
  text-align: center;
`;
const LinksWrapper = styled.div``;

const LogoStyled = styled.img``;

export default HeaderBar;
