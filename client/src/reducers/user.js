import types from "../actions/types";

const userObj = JSON.parse(sessionStorage.getItem("userObj"));

// Estado inicial
const initialState = {
  logged: userObj !== null ? true : false,
  user: userObj !== null ? userObj : {},
};

// Implementamos el reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        logged: action.data !== null ? true : false,
        user: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
