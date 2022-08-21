import { Route, Redirect } from "react-router";
import { useAppSelector } from "../redux/hooks";
import React from "react";

export default function PrivateRoute(props: any) {
  const authenticated = useAppSelector((state) => state.auth);
  if (!authenticated.token) return <Redirect to="/auth/login" />;
  return <Route {...props} />;
}
