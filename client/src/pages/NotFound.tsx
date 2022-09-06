import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Heading, Text, Button, Container } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Container
      maxW="100vw"
      h="950px"
      p="0"
      bgSize="cover"
      bgImage="url('/img/landing-wallpaper.jpg')"
    >
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" color="white" mt={3} mb={2}>
          Página no encontrada
        </Text>
        <Text color={"gray.500"} mb={6}>
          La página que estás buscando no parece existir
        </Text>

        <Button
          as={ReactLink}
          to="/"
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          Ir al inicio
        </Button>
      </Box>
    </Container>
  );
}
