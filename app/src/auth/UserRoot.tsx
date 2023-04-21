import { setUser } from "./auth-slice";
import { useAppDispatch } from "../store/store";
import React from "react";

export const UserRoot = () => {
  const dispatch = useAppDispatch();

  const resetUser = () => {
    dispatch(setUser(null));
  };
  React.useEffect(() => resetUser(), []);

  return <></>;
};
