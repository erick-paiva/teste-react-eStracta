import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages";

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
};
