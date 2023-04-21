import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { registerLicense } from "@syncfusion/ej2-base";
import { MsalProvider } from "@azure/msal-react";
import { client } from "./auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

registerLicense(import.meta.env.VITE_SYNCFUSION);
const container = document.getElementById("root")!;

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MsalProvider instance={client}>
        <App />
      </MsalProvider>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </Provider>
  </React.StrictMode>
);
