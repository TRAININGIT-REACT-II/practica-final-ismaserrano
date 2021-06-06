import types from "./types";

export const addNote = (note) => ({
  type: types.ADD_NOTE,
  data: note,
});
