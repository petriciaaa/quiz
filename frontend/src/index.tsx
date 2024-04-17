import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/main.scss";
import "assets/scss/fonts.scss";
import "assets/scss/reset.scss";
import { store } from "./store/index";

const rootDom = document.getElementById("root") as HTMLElement;

if (!rootDom) {
  document.body.innerHTML = "<h1>Sorry, no data availible!</h1>";
} else {
  const root = ReactDOM.createRoot(rootDom);
  root.render(
    //
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
    //
  );
}
