import { AuthRoutes } from "@/modules";
import { Route, Routes } from "react-router-dom";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />
    </Routes>
  );
};
