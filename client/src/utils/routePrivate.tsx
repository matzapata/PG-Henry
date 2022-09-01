import { Text } from "@chakra-ui/react";
import React from "react";
import { Route, Redirect } from "react-router";
import { useAppSelector } from "../redux/hooks";

export default function PrivateRoute(props: any) {
  const isAuthenticated = useAppSelector((state) => state.auth.token);
  const isLoading = useAppSelector((state) => state.auth.loading);

  if (isAuthenticated) return <Route {...props} />;
  else if (isLoading) return <Text>Loading...</Text>;
  else return <Redirect to="/auth/login" />;
}
