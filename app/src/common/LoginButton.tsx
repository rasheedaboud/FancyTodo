import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { login } from "../auth/Auth";
import { useMsal } from "@azure/msal-react";

const LoginButton = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const client = useMsal();

  const handleClick = () => {
    login(client.instance);
  };

  return (
    <>
      {isMobile ? (
        <ButtonComponent
          cssClass='e-inherit'
          iconCss='fa-solid fa-right-to-bracket'
          onClick={handleClick}
        />
      ) : (
        <ButtonComponent
          cssClass='e-inherit'
          iconCss='fa-solid fa-right-to-bracket'
          onClick={handleClick}
        >
          Login
        </ButtonComponent>
      )}
    </>
  );
};

export default LoginButton;
