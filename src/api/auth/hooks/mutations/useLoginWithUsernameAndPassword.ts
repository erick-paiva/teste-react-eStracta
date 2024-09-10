import { useMutation } from "@tanstack/react-query";

import { loginWithUsernameAndPassword } from "../../requests";
import { LoginCredentials } from "../../types";

export const useLoginWithUsernameAndPassword = () =>
  useMutation({
    mutationFn: async (body: LoginCredentials) =>
      await loginWithUsernameAndPassword(body),
  });
