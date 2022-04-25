import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { MealContextProvider } from "./MealContext";
import Auth0ProviderWithHistory from "./Auth0/Auth0Provider";

ReactDOM.render(
  <Auth0ProviderWithHistory>
    <MealContextProvider>
      <App />
    </MealContextProvider>
  </Auth0ProviderWithHistory>,
  document.getElementById("root")
);
