import {
  AccountInfo,
  EventType,
  IPublicClientApplication,
  PublicClientApplication,
  RedirectRequest,
  SilentRequest,
} from "@azure/msal-browser";

import { store, useAppDispatch, useAppSelector } from "../store/store";
import { User, clearUser, setUser } from "./auth-slice";
import { useEffect, useMemo } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

const msalConfig = {
  auth: {
    clientId: "6fa77997-411f-484d-9506-49fa0bfa34ae",
    authority:
      "https://fancytodos.b2clogin.com/fancytodos.onmicrosoft.com/B2C_1_Sign_In",
    knownAuthorities: ["https://fancytodos.b2clogin.com"],
    redirectUri: import.meta.env.VITE_REDIRECT,
    postLogoutRedirectUri: import.meta.env.VITE_REDIRECT,
  },
  cache: { cacheLocation: "sessionStorage", storeAuthStateInCookie: false },
};

export const client = new PublicClientApplication(msalConfig);

const request: RedirectRequest = {
  scopes: [],
  authority:
    "https://fancytodos.b2clogin.com/fancytodos.onmicrosoft.com/B2C_1_Sign_In",
  redirectUri: import.meta.env.VITE_REDIRECT,
};
const forgotPassword: RedirectRequest = {
  scopes: [],
  authority:
    "https://fancytodos.b2clogin.com/fancytodos.onmicrosoft.com/B2C_1_Reset_Password",
  redirectUri: import.meta.env.VITE_REDIRECT,
};
export const silentToken = (accountInfo: AccountInfo | null) => {
  return {
    scopes: [
      "https://fancytodos.onmicrosoft.com/6fa77997-411f-484d-9506-49fa0bfa34ae/Read",
    ],
    account: accountInfo,
    forceRefresh: false,
  };
};

export const useSetUser = () => {
  const user = useAppSelector((state) => state.userState.user);
  const dispatch = useAppDispatch();
  const msal = useMsal();
  const isauthenticated = useIsAuthenticated();

  const callbackId = msal.instance.addEventCallback((message) => {
    if (message.eventType === EventType.LOGIN_FAILURE) {
      if (message.error.errorMessage.includes("AADB2C90118")) {
        msal.instance.loginRedirect(forgotPassword);
      }
    }
  });

  useEffect(() => {
    const init = async () => {
      const user = await setActiveUser(msal.instance);
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    };
    init();
  }, [isauthenticated]);
  return user;
};

export const extractIdTokenClaims = (account: any): User => {
  if (account == null)
    return {
      FirstName: "",
      LastName: "",
      DisplayName: "",
      Email: "",
    };

  return {
    FirstName: account.given_name,
    LastName: account.family_name,
    DisplayName: account.name,
    Email: account.emails[0],
  };
};
export const setActiveUser = async (
  client: IPublicClientApplication
): Promise<User | null> => {
  try {
    const accounts = await client.getAllAccounts();
    if (accounts == null || accounts.length <= 0) return;
    client.setActiveAccount(accounts[0]);
    const user = extractIdTokenClaims(accounts[0].idTokenClaims) as User;
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const login = async (client: IPublicClientApplication) => {
  try {
    if (import.meta.env.VITE_REDIRECT == null)
      throw Error(
        "Invalid environment configuration. Verify redirect URI is set."
      );

    await client.loginRedirect(request);
  } catch (err) {
    console.log(err);
  }
};
export const logout = (client: IPublicClientApplication) => {
  const dispatch = store.dispatch;
  try {
    dispatch(clearUser());
    client.logoutRedirect(request);
  } catch (err) {
    console.log(err);
  }
};

export const requestToken = async () => {
  try {
    const accountInfo = client.getActiveAccount();
    const request = silentToken(accountInfo) as SilentRequest;
    const result = await client.acquireTokenSilent(request);

    return result.accessToken;
  } catch (error) {
    console.log(error);
  }
};
