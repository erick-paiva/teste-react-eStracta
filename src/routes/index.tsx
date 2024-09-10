import { useAuth } from "@/context/useAuth";
import { lazyImport } from "../utils";

const { ProtectedRoutes } = lazyImport(
  async () => await import("./ProtectedRoutes"),
  "ProtectedRoutes"
);

const { PublicRoutes } = lazyImport(
  async () => await import("./PublicRoutes"),
  "PublicRoutes"
);

export const AppRoutes = (): JSX.Element => {
  const user = useAuth();

  return user?.isAuthenticated === true ? (
    <ProtectedRoutes />
  ) : (
    <PublicRoutes />
  );
};
