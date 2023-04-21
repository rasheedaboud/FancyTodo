import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useMediaQuery } from "react-responsive";
import { logout } from "../auth/Auth";
import { useMsal } from "@azure/msal-react";

const LogoutButton = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const client = useMsal();
  const handleClick = () => {
    logout(client.instance);
  };
  return (
    <>
      {isMobile ? (
        <ButtonComponent
          cssClass='e-inherit login'
          iconCss='fa-solid fa-right-from-bracket'
          onClick={handleClick}
        />
      ) : (
        <ButtonComponent
          cssClass='e-inherit login'
          iconCss='fa-solid fa-right-from-bracket'
          onClick={handleClick}
        >
          Logout
        </ButtonComponent>
      )}
    </>
  );
};

export default LogoutButton;
