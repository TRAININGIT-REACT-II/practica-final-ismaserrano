import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Componentes */
import { NotFound } from "./components/NotFound";
import { AppContainer } from "./components/AppContainer";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Notes } from "./components/Notes";

const App = () => {
  useEffect(() => {}, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AppContainer>
            <Notes />
          </AppContainer>
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
