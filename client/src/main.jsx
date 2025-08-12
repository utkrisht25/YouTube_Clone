import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <PersistGate loading ={<div>Loading...</div>}  persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
