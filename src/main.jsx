import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client
import { Provider } from "react-redux";
import store from "./Redux/store";
import App from "./App";
import "./index.css";
// Get the root element
const rootElement = document.getElementById("root");

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
