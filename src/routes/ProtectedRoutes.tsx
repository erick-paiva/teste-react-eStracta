import { Navigate, Route, Routes } from "react-router-dom";

export const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route
        index
        path="/home"
        element={<p style={{ color: "red" }}>hello </p>}
      />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
