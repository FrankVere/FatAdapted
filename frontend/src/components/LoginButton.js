import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <ButtonStyled
      className="buttonstyle-hover click"
      onClick={() => {
        loginWithRedirect();
      }}
    >
      Log In
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  margin-top: 6px;
`;
export default LoginButton;
