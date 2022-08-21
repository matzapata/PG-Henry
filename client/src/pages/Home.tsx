import React from "react";
import { Box, Button } from "@chakra-ui/react";
/* import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; */
import NavBar from "../components/UnloggedNav";

function Home() {
  return (
    <Box
      maxW="100vw"
      h="950px"
      /* bgColor="#082032" */
      bgSize="cover"
      bgImage="url('https://www.xtrafondos.com/wallpapers/uefa-champions-league-estadio-2932.jpg')"
      p="0"
    >
      <NavBar />
    </Box>
  );
}

export default Home;
