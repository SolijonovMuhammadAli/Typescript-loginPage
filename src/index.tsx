import React from "react";
import ReactDOM from "react-dom";
import { mount, route } from "navi";
import { Router } from "react-navi";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./Auth/LoginPage";
import Register from "./Auth/Register";
import IdeasList from "./Ideas/IdeasList";
import { withAuthentication } from "./Auth/authenticaterRoute";
import { TOKEN_KEY } from "./Auth/auth.api";

const routes = mount({
  "/": withAuthentication(
    route({
      title: "Ideas",
      view: <IdeasList />,
    })
  ),
  "/login": route({
    title: "Login",
    view: <LoginPage />,
  }),
  "/register": route({
    title: "Register",
    view: <Register />,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <Router
      routes={routes}
      context={{ token: localStorage.getItem(TOKEN_KEY) }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
