import types from "../actions/types";

/* Initial state */
const initialState = {
  list: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Agregar un TODO
    case types.ADD_NOTE:
      return {
        notes: [...state.notes, action.data],
      };
    default:
      return state;
  }
};

export default reducer;
