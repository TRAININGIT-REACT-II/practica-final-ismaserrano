import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../../selectors/user";

const PrivateRoute = ({ children, ...others }) => {
  const user = useSelector((state) => getUser(state));

  return (
    <Route
      {...others}
      render={() =>
        user.logged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { msg: "Identifícate para acceder al recurso" },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
