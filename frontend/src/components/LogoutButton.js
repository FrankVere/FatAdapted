import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <ButtonStyled
      className="bn632-hover bn19"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  margin-top: 6px;
`;

export default LogoutButton;
