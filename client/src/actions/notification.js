import types from "./types";

export const setNotification = (notification) => ({
  type: types.SET_NOTIFICATION,
  data: notification,
});
