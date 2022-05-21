import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const HeaderBar = () => {
  const { user, isAuthenticated } = useAuth0();

  let navigate = useNavigate();
  const handleNav = () => {
    navigate("/");
  };
  return (
    <Container>
      <LogoStyled onClick={handleNav} src={logo} />
      <div>{user && isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
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

const LogoStyled = styled.img`
  border-radius: 6px;
`;

export default HeaderBar;
