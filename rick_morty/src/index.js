import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import reportWebVitals from "./reportWebVitals";


import { Toaster } from "react-hot-toast";

//react-router-dom
import { BrowserRouter } from "react-router-dom";
//redux
import { store } from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Toaster />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();