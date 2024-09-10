import { Route, Routes } from "react-router-dom";

export const ProtectedRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<>hello </>} />
    </Routes>
  );
};
