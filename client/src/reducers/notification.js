import types from "../actions/types";

// Estado inicial
const initialState = {
  notification: null,
};

// Implementamos el reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NOTIFICATION:
      return {
        notification: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
