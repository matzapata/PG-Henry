import React from "react";
import { Box, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      <NavBar />
      <Box maxWidth="4xl" mx={["4", "auto"]} mt="20">
        <Text fontSize="xl" fontWeight="medium" mb="2">
          About us
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada sed
          habitasse felis, volutpat nunc adipiscing mi, suspendisse. Nec
          ultrices sed lectus nunc fringilla. Tellus varius hendrerit nunc in
          iaculis eget. Quam volutpat donec auctor dictum.
        </Text>
      </Box>
    </>
  );
}

export default Home;
