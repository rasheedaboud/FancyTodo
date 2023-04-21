import { AppBarComponent } from "@syncfusion/ej2-react-navigations";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import SfAppbarSpacer from "./SfAppbarSpacer";
import LoginButton from "./LoginButton";
import { useAppSelector } from "../store/store";
import LogoutButton from "./LogoutButton";
import { NetworkStatus } from "./NetworkStatus";

const SfAppbar = () => {
  const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);
  const user = useAppSelector((state) => state.userState.user);

  return (
    <AppBarComponent colorMode='Primary'>
      <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>
        Fancy Todos
      </span>
      <SfAppbarSpacer />
      <NetworkStatus />
      {isLoggedIn ? (
        <span>Hi, {`${user?.FirstName[0]}.${user?.LastName}`}!</span>
      ) : null}
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
    </AppBarComponent>
  );
};

export default SfAppbar;
