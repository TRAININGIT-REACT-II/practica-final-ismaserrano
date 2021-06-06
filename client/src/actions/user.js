import types from "./types";

export const setUser = (user) => ({
  type: types.SET_USER,
  data: user,
});
