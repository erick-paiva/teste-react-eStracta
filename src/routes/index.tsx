import { useAuth } from "../context";
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

  console.log(user, " user");

  return user?.isAuthenticated ? <ProtectedRoutes /> : <PublicRoutes />;
};
