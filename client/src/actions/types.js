const actions = [
  /* Notes */
  "ADD_NOTE",
  "EDIT_NOTE",
  "DELETE_NOTE",

  /* Users */
  "SET_USER",

  /* Notifications */
  "SET_NOTIFICATION",
];

const actionTypes = {};
actions.forEach((action) => {
  actionTypes[action] = action;
});

export default actionTypes;
