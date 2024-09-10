import axios from "@/lib/axios";

import { LoginCredentials, LoginResponse } from "./types";

export const loginWithUsernameAndPassword = async (
  body: LoginCredentials
): Promise<LoginResponse> =>
  await axios.authorized().post("/companies/login", body);
