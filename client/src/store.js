import { createStore, combineReducers, applyMiddleware } from "redux";

/* Reducers */
import notes from "./reducers/notes";
import user from "./reducers/user";
import notification from "./reducers/notification";

/* Middlewares */
import logger from "./middlewares/logger";

export default createStore(
  combineReducers({ notes, user, notification }),
  applyMiddleware(logger)
);
