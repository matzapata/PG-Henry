import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { logout, isAuthenticated } = useAuth0();
  return (
    <div>
      <Link to="/login">
        <Button
          display="flex"
          borderRadius={0}
          id="auth0_login"
          type="submit"
          variant="solid"
          colorScheme="red"
          width="150px"
        >
          <span>Login</span>
        </Button>
      </Link>

      <Button
        display="flex"
        borderRadius={0}
        id="auth0_login"
        type="submit"
        variant="solid"
        colorScheme="red"
        width="150px"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        <span>Logout</span>
      </Button>
      {isAuthenticated ? "MENSAJE LOGEADO" : "LOGEATE PARA VER EL MENSAJE"}
    </div>
  );
}

export default Home;
