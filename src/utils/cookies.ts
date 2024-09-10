import Cookies from "js-cookie";

import { ACCESS_TOKEN_ID } from "@/config";

export const cookies = {
  getAccess: () => Cookies.get(ACCESS_TOKEN_ID),
  setAccess: (accessToken: string) => Cookies.set(ACCESS_TOKEN_ID, accessToken),
  clearAccess: () => Cookies.remove(ACCESS_TOKEN_ID),
};
