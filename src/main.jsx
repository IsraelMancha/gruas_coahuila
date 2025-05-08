import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globalStyles.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
