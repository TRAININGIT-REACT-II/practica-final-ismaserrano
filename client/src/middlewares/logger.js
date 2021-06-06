const logger = (store) => (next) => (action) => {
  console.log("ACTION: ", action);
  console.log("PREV STATE: ", store.getState());
  const result = next(action);
  console.log("NEXT STATE: ", store.getState());

  return result;
};

export default logger;
