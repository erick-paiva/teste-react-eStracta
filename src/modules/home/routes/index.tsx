import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages";
import { storage } from "../../../utils";

export const AuthRoutes = () => {
  const user = storage.getUser();

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />

      {!user && <Route path="*" element={<Navigate to="login" />} />}
    </Routes>
  );
};
