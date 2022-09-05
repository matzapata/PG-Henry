import React from "react";
import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "../redux/hooks";
import { signOut } from "../redux/slices/authThunk";
import { useAuth0 } from "@auth0/auth0-react";

function SignOutButton() {
  const dispatch = useAppDispatch();
  const { logout, isAuthenticated } = useAuth0();

  return (
    <Button
      onClick={() => {
        if (isAuthenticated) logout(); // auth0
        dispatch(signOut()); // app JWT
      }}
      bgColor="buttons"
      color="text"
      _hover={{
        bg: "secondary",
        color: "primary",
      }}
      size="md"
    >
      Salir
    </Button>
  );
}

export default SignOutButton;
