import { Route, Redirect } from "react-router";
import { useAppSelector } from "../redux/hooks";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function PrivateRoute(props: any) {
  const { isAuthenticated } = useAuth0();

  const authenticated = useAppSelector((state) => state.auth);
  if (authenticated.token || isAuthenticated) return <Route {...props} />;
  return <Redirect to="/auth/login" />;
}
