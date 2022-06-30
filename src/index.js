import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Provider from "./Context";

axios.defaults.baseURL = "https://toko.ox-sys.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider>
      <App />
    </Provider>
  </Router>
);
