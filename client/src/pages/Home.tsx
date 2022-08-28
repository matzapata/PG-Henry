import React, { useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import PublicTournaments from "../components/PublicTournament";
import Carousel from "../components/NewsCarousel";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import UserTournaments from "../components/UserTournaments";
import { useAuth0 } from "@auth0/auth0-react";
import { createAuthAccount } from "../redux/slices/authThunk";
import { loginAuth0 } from "../redux/slices/authThunk";
import { IoTrophy } from "react-icons/io5";

function Home() {
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useAppDispatch();
  const email: any = user?.email;
  const password: any = "test";

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(
        createAuthAccount({
          email: user?.email,
          username: user?.name,
          full_name: user?.name,
          avatar: user?.picture,
          password: password,
        })
      );
      dispatch(loginAuth0({ email, password, check: true }));
    }
  }, [isAuthenticated]);

  return (
    <Container
      maxW="100vw"
      h="100vh"
      p="0"
      bgColor="DPrimary"
      bgSize="cover"
      bgImage="url('/img/bgImg.png')"
      bgPosition="center"
    >
      <NavBar />
      {/* <HStack
        mt={10}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={3}
      >
        <Box
          // px={["4", "24"]}
          // py={["10", "24"]}
          // mx={["4", "10"]}
          // my="4"
          // mt="15%"
          width="65%"
          borderRadius="20px"
          opacity="95%"
          backgroundColor="gray.600"
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
              Participá de los torneos mas famosos por premios en efectivo, o
              creá el tuyo personalizado para competir con tus amigos
            </Text>
            <Divider mt="5%" />
          </Box>
          {isLoggedIn && (
            <Box mt="8">
              <UserTournaments />
            </Box>
          )}
        </Box>
        <VStack width="35%">
          <Box bgColor="gray.600" borderRadius={20} height="50vh">
            {!isLoggedIn && <Carousel />}
          </Box>
          <Box bgColor="gray.600" borderRadius={20}>
            <PublicTournaments />
          </Box>
        </VStack>
      </HStack> */}
      <Flex
        backgroundColor="gray.800"
        mt="90vh"
        pl="5%"
        borderTopWidth={5}
        borderTopColor="Dtext"
        justifyContent="space-between"
      >
        <IoTrophy size="20em" color="#0096FF" />
        <Box maxWidth="3xl" me={20} mt={10} mb={10}>
          <Heading
            fontSize={["2xl", "5xl"]}
            fontWeight="thin"
            color="DText"
            textAlign="end"
            textTransform="uppercase"
          >
            La mejor página de pronósticos deportivos
          </Heading>
          <Text
            mt="5%"
            textAlign="end"
            fontSize={"x-large"}
            fontFamily="heading"
            fontWeight="thin"
            color="DText"
          >
            Participá de los torneos mas famosos por premios en efectivo, o creá
            el tuyo personalizado para competir con tus amigos!
          </Text>
          {/* <Divider mt="5%" /> */}
        </Box>
      </Flex>
    </Container>
  );
}

export default Home;
