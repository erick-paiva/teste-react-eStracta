import { useAuth } from "@/context/useAuth";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRoutes = (): JSX.Element => {
  const user = useAuth();

  return user?.isAuthenticated === true ? (
    <ProtectedRoutes />
  ) : (
    <PublicRoutes />
  );
};
