import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar(): JSX.Element {
  const { logout, isAuthenticated } = useAuth0();
  return (
    <Box p="20px">
      {isAuthenticated ? "MENSAJE SECRETO" : "LOGEATE PARA VER EL MENSAJE"}
      <Link to="/auth/ingresar">
        <Button
          _hover={{
            color: "#082032",
          }}
          bgColor="#4FBDBA"
          color="#F7F7F7"
          id="auth0_login"
          type="submit"
        >
          <span>Login</span>
        </Button>
      </Link>

      <Button
        id="auth0_login"
        type="submit"
        _hover={{
          color: "#082032",
        }}
        bgColor="#4FBDBA"
        color="#F7F7F7"
        ml="10px"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        <span>Logout</span>
      </Button>
    </Box>
  );
}

export default NavBar;
