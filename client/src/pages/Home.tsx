import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      <NavBar />
      <Box
        px={["4", "24"]}
        py={["10", "24"]}
        mx={["4", "10"]}
        my="4"
        borderRadius={8}
        backgroundColor="purple.500"
      >
        <Box maxWidth="3xl" mx={["4", "8", "auto"]}>
          <Heading
            fontSize={["2xl", "5xl"]}
            fontWeight="800"
            color="purple.100"
            textAlign="center"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
            explicabo quisquam.
          </Heading>
          <Text
            mt="6"
            textAlign="center"
            fontSize={["md", "lg"]}
            fontWeight="500"
            color="purple.100"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada
            sed habitasse felis, volutpat nunc adipiscing mi, suspendisse. Nec
            ultrices sed lectus nunc fringilla. Tellus varius hendrerit nunc in
            iaculis eget. Quam volutpat donec auctor dictum.
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default Home;
