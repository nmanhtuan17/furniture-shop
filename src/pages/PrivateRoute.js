import React from "react";
import { Route, Link } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return <Link to="/" />;
      }}
    ></Route>
  );
};
export default PrivateRoute;
