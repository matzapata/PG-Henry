import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Image } from "@chakra-ui/react";

function Auth0SignInButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      type="button"
      width="full"
      display="flex"
      colorScheme="gray"
      border="1px"
      borderColor="gray.300"
      onClick={loginWithRedirect}
      marginTop="0"
    >
      <Image src="/img/auth0.png" alt="logo_auth0" width="50px" />
      <Box as={"span"}>Ingresar con Auth0</Box>
    </Button>
  );
}

export default Auth0SignInButton;
