import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AdminContext from "../../contexts/AdminContext";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { admin } = useContext(AdminContext);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        admin?.role?.toLowerCase().includes("super admin") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default ProtectedRoute;
