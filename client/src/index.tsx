import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import chakraTheme from "./utils/chakraTheme";
import history from "./utils/history";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <ChakraProvider theme={chakraTheme}>
          <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
            redirectUri={process.env.REACT_APP_CLIENT_URL as string}
          >
            <App />
          </Auth0Provider>
        </ChakraProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
