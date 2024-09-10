import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../modules";

export const PublicRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />
    </Routes>
  );
};
