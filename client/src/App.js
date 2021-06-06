import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Componentes */
import { NotFound } from "./components/NotFound";
import { AppContainer } from "./components/AppContainer";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Notes, NotesAdd, NotesDetail } from "./components/Notes";
import { PrivateRoute } from "./components/PrivateRoute";

import { Provider } from "react-redux";

import { ErrorBoundary } from "./components/ErrorBoundary";

/* Store */
import store from "./store";

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Switch>
            {/* Listado notas */}
            <PrivateRoute exact path="/">
              <AppContainer>
                <Notes />
              </AppContainer>
            </PrivateRoute>
            {/* Añadir nota */}
            <PrivateRoute exact path="/add">
              <AppContainer>
                <NotesAdd />
              </AppContainer>
            </PrivateRoute>
            {/* Registro */}
            <Route exact path="/signup">
              <SignUp />
            </Route>
            {/* Login */}
            <Route exact path="/signin">
              <SignIn />
            </Route>
            {/* Detalle nota */}
            <PrivateRoute exact path="/:id?">
              <AppContainer>
                <NotesDetail />
              </AppContainer>
            </PrivateRoute>
            {/* 404 */}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
