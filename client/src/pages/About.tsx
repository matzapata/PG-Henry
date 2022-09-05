import React from "react";
import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import Logo from "../components/Logo";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function About() {
  return (
    <Container
      maxW="100vw"
      h="950px"
      p="0"
      bgSize="cover"
      bgImage="url('/img/landing-wallpaper.jpg')"
    >
      <Box
        h="80px"
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        p="20px"
      >
        <Flex alignItems="center">
          <Logo />
          <Text fontSize="30px" fontWeight="bold" color="text" ml="4" mt="0">
            ProdeMaster
          </Text>
        </Flex>
        <Box display="flex" flexDir="row">
          <Link to="/">
            <ArrowBackIcon color="text" fontSize="30px" pt="2px" />
          </Link>
        </Box>
      </Box>
      <Box maxWidth="3xl" mx={["4", "8", "auto"]}>
        <Heading
          fontSize={["2xl", "5xl"]}
          fontWeight="800"
          color="text"
          textAlign="center"
        >
          Nosotros
        </Heading>
        <Text
          mt="6"
          textAlign="center"
          fontSize={["md", "lg"]}
          fontWeight="500"
          color="text"
        >
          En Prode Master podras encontrar multiples torneos renocidos, tanto
          nacionales como internacionales que te permitira completar
          predicciones deportivas y competir con los demas usuarios del sitio
          por premios en efectivo.
        </Text>
        <Divider />
        <Heading
          fontSize={["2xl", "5xl"]}
          fontWeight="800"
          color="text"
          textAlign="center"
        >
          Equipo de Desarrollo
        </Heading>
      </Box>
      <Grid templateColumns="repeat(3, 3fr)" gap={35} m="20px" pt="50px">
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          color="text"
          textAlign="center"
          transition="200ms ease"
          backgroundColor="rgba(57,91,100,0.7)"
          borderRadius="20px"
          display={"flex"}
        >
          <Heading fontSize="xl">Matias Zapata</Heading>
          <Text pl={12} pr={12} mt={4}>
            Full-Stack Developer
          </Text>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/matzapata"
            aria-label="GitHub"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              viewBox="0 0 32 32"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"></path>
            </svg>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/matias-zapata-b57406143/"
            aria-label="LinkedIn"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z"></path>
            </svg>
          </a>
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          color="text"
          textAlign="center"
          transition="200ms ease"
          backgroundColor="rgba(57,91,100,0.7)"
          borderRadius="20px"
          display={"flex"}
        >
          <Heading fontSize="xl">Melina Maccio</Heading>
          <Text pl={12} pr={12} mt={4}>
            Full-Stack Developer
          </Text>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/MelMaccio"
            aria-label="GitHub"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              viewBox="0 0 32 32"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"></path>
            </svg>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/melina-maccio/"
            aria-label="LinkedIn"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z"></path>
            </svg>
          </a>
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          color="text"
          textAlign="center"
          transition="200ms ease"
          backgroundColor="rgba(57,91,100,0.7)"
          borderRadius="20px"
          display={"flex"}
        >
          <Heading fontSize="xl">Alejandro Guil</Heading>
          <Text pl={12} pr={12} mt={4}>
            Full-Stack Developer
          </Text>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/AlejandroGuil"
            aria-label="GitHub"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              viewBox="0 0 32 32"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"></path>
            </svg>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/alejandro-guil-6a3607237/"
            aria-label="LinkedIn"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z"></path>
            </svg>
          </a>
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          color="text"
          textAlign="center"
          transition="200ms ease"
          backgroundColor="rgba(57,91,100,0.7)"
          borderRadius="20px"
          display={"flex"}
        >
          <Heading fontSize="xl">Santiago Hayase</Heading>
          <Text pl={12} pr={12} mt={4}>
            Full-Stack Developer
          </Text>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Intervention2"
            aria-label="GitHub"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              viewBox="0 0 32 32"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"></path>
            </svg>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/santiago-hayase-88654a240/"
            aria-label="LinkedIn"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z"></path>
            </svg>
          </a>
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          color="text"
          textAlign="center"
          transition="200ms ease"
          backgroundColor="rgba(57,91,100,0.7)"
          borderRadius="20px"
          display={"flex"}
        >
          <Heading fontSize="xl">Diego Cerda Celis</Heading>
          <Text pl={12} pr={12} mt={4}>
            Full-Stack Developer
          </Text>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Xxmbxxmb"
            aria-label="GitHub"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              viewBox="0 0 32 32"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"></path>
            </svg>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/diego-cerda-celis-975050237/"
            aria-label="LinkedIn"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z"></path>
            </svg>
          </a>
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          color="text"
          textAlign="center"
          transition="200ms ease"
          backgroundColor="rgba(57,91,100,0.7)"
          borderRadius="20px"
          display={"flex"}
        >
          <Heading fontSize="xl">Nicolas De Carolis</Heading>
          <Text pl={12} pr={12} mt={4}>
            Full-Stack Developer
          </Text>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/deca38"
            aria-label="GitHub"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              viewBox="0 0 32 32"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"></path>
            </svg>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/nicol%C3%A1s-de-carolis-31452b220/"
            aria-label="LinkedIn"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z"></path>
            </svg>
          </a>
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          color="text"
          textAlign="center"
          transition="200ms ease"
          backgroundColor="rgba(57,91,100,0.7)"
          borderRadius="20px"
          display={"flex"}
        >
          <Heading fontSize="xl">Santiago Tobar</Heading>
          <Text pl={12} pr={12} mt={4}>
            Full-Stack Developer
          </Text>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/santi1227"
            aria-label="GitHub"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              viewBox="0 0 32 32"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"></path>
            </svg>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/santiago-tobar-useche-429a2a1ab/"
            aria-label="LinkedIn"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              focusable="false"
              className="chakra-icon css-9t64xk"
              height="45px"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z"></path>
            </svg>
          </a>
        </Box>
      </Grid>
    </Container>
  );
}

export default About;
