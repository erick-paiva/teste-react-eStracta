import { HomeRoutes } from "@/modules/home";
import { Navigate, Route, Routes } from "react-router-dom";

export const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route index path="/home" element={<HomeRoutes />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
