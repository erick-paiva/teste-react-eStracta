import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages";
import { cookies } from "@/utils";

export const AuthRoutes = () => {
  const accessToken = cookies.getAccess();

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />

      {!accessToken && <Route path="*" element={<Navigate to="login" />} />}
    </Routes>
  );
};
