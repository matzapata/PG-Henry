import React, { useEffect } from "react";
import { Box, Container, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import PublicTournaments from "../components/PublicTournament";
import Carousel from "../components/NewsCarousel";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import UserTournaments from "../components/UserTournaments";
import { IoTrophy } from "react-icons/io5";
import ReviewCarousel from "../components/ReviewCarousel";
import { useAuth0 } from "@auth0/auth0-react";
import { loginAuth0 } from "../redux/slices/authThunk";
import { getReviews } from "../redux/slices/userThunk";
import { useHistory } from "react-router-dom";

function Home() {
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const data = useAppSelector((state) => state.user.userComments);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAuth0();
  const infoUser = useAppSelector((state) => state.auth.decoded);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated)
      dispatch(
        loginAuth0({
          email: user?.email as string,
          username: user?.nickname as string,
          full_name: user?.name as string,
          birth_date: user?.birthdate as string,
          check: true,
        })
      );
    dispatch(getReviews(null));
  }, []);

  useEffect(() => {
    if (infoUser?.is_banned === true) history.push("/banned");
  }, [infoUser]);

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
            color="text"
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
            color="text"
          >
            Participá de los torneos mas famosos por premios en efectivo, o creá
            el tuyo personalizado para competir con tus amigos!
          </Text>
          {/* <Divider mt="5%" /> */}
        </Box>
      </Flex>
      <HStack
        margin={"5%"}
        alignItems="start"
        spacing={10}
        justifyContent="space-between"
      >
        <Box>
          <PublicTournaments />
        </Box>
        <Box height="50vh" width={"50%"}>
          {!isLoggedIn && (
            <Box height="50vh" width={"100%"} marginTop="75px">
              <Carousel />
              {data.length === 0 ? null : (
                <Box width={"100%"} marginTop="75px" paddingLeft={"80px"}>
                  <ReviewCarousel />
                </Box>
              )}
            </Box>
          )}
          {isLoggedIn && (
            <Box mt="12">
              <UserTournaments />
              {data.length === 0 ? null : (
                <Box width={"100%"} marginTop="100px" paddingLeft={"80px"}>
                  <ReviewCarousel />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </HStack>
    </Container>
  );
}

export default Home;
