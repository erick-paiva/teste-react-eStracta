import { USER_INFO_ID } from "../config";

export const storage = {
  getUser: () =>
    JSON.parse(window.localStorage.getItem(`${USER_INFO_ID}`) as string),
  setUser: (user: unknown) =>
    window.localStorage.setItem(`${USER_INFO_ID}`, JSON.stringify(user)),
  clearUser: () => window.localStorage.removeItem(`${USER_INFO_ID}`),
};
