import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const HeaderBar = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Container>
      <LinksWrapper>
        {" "}
        {user && isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </LinksWrapper>
    </Container>
  );
};

const Container = styled.header``;
const LinksWrapper = styled.div``;

export default HeaderBar;
