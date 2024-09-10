import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
