import React from "react";
import { Route, Redirect } from "react-router";
import { useAppSelector } from "../redux/hooks";

export default function PrivateRoute(props: any) {
  const isAuthenticated = useAppSelector((state) => state.auth.token);
  if (isAuthenticated) return <Route {...props} />;
  return <Redirect to="/auth/login" />;
}
