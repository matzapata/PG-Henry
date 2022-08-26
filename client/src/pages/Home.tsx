import React from "react";
import { Box, Container, Divider, Heading, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import PublicTournaments from "../components/PublicTournament";
import Carousel from "../components/NewsCarousel";
import { useAppSelector } from "../redux/hooks";
import UserTournaments from "../components/UserTournaments";

function Home() {
  const isAuthenticated = useAppSelector((state) => state.auth.token);

  return (
    <Container
      maxW="100vw"
      h="950px"
      pt="0"
      bgSize="cover"
      bgImage="url('/img/landing-wallpaper.jpg')"
      bgPosition="center"
    >
      <NavBar />
      <Carousel />
      <Box
        px={["4", "24"]}
        py={["10", "24"]}
        mx={["4", "10"]}
        my="4"
        mt="15%"
        borderRadius="20px"
        opacity="95%"
        backgroundColor="#082032"
      >
        <Box maxWidth="3xl" mx={["4", "8", "auto"]}>
          <Heading
            fontSize={["2xl", "5xl"]}
            fontWeight="800"
            color="#F7F7F7"
            textAlign="center"
          >
            Prode Master, la mejor página de pronósticos deportivos
          </Heading>
          <Text
            mt="5%"
            textAlign="center"
            fontSize={["md", "lg"]}
            fontWeight="500"
            color="#F7F7F7"
          >
            Participá de los torneos mas famosos por premios en efectivo, o creá
            el tuyo personalizado para competir con tus amigos
          </Text>
          <Divider mt="5%" />
        </Box>

        {isAuthenticated && (
          <Box mt="8">
            <UserTournaments />
          </Box>
        )}

        <Box mt="10">
          <PublicTournaments />
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
