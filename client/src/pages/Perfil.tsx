import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Icon,
  Text,
  Box,
} from "@chakra-ui/react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import UploadFiles from "../components/UploadFile";
import {
  deleteActiveUser,
  getUserInfo,
  updateProfile,
} from "../redux/slices/userThunk";
import history from "../utils/history";
import { signOut } from "../redux/slices/authThunk";
import { FaExclamationCircle } from "react-icons/fa";
import NavBar from "../components/NavBar";

export default function UserProfileEdit(): JSX.Element {
  const { user, isAuthenticated, logout } = useAuth0();
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const [error, setError] = useState("");
  const success = useAppSelector((state) => state.user.message);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    alias: "",
  });
  const dispatch = useAppDispatch();
  const user_detail = useAppSelector((state) => state.user.userDetail);
  const userid: any = useAppSelector((state) => state.auth.decoded?.id);

  function editProfile() {
    if (input.email && input.password && input.alias) {
      dispatch(
        updateProfile({
          id: userid,
          email: input.email,
          password: input.password,
          alias_mp: input.alias,
        })
      );
    } else if (input.email && input.password) {
      dispatch(
        updateProfile({
          id: userid,
          email: input.email,
          password: input.password,
          alias_mp: "",
        })
      );
    } else setError("Faltan parametros requeridos");
  }

  function onDeleteUser() {
    if (isLoggedIn) dispatch(deleteActiveUser({ id: userid, is_active: true }));
    if (isLoggedIn) dispatch(signOut());
    else if (isAuthenticated) logout();
    history.push("/");
  }

  const handleChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  useEffect(() => {
    if (isLoggedIn) dispatch(getUserInfo(null));
    if (isAuthenticated) dispatch(getUserInfo(null));

    if (success)
      setTimeout(() => {
        window.location.reload();
      }, 1500);
  }, [success]);

  return (
    <>
      <Box bgColor="primary">
        <NavBar />
        {isLoggedIn && isAuthenticated ? (
          <Flex
            h="900px"
            p="0"
            bgSize="cover"
            bgImage="url('/img/landing-wallpaper.jpg')"
            maxW={"100vw"}
            align={"center"}
            justify={"center"}
          >
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                Editar Perfil
              </Heading>
              <FormControl id="userName">
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar size="xl" src={user_detail?.avatar}></Avatar>
                  </Center>
                  <Center w="full">
                    <UploadFiles
                      funcion={"Cambiar Avatar"}
                      titulo={"Subir Imagen"}
                      url={"/users/changeavatar"}
                    />
                  </Center>
                </Stack>
              </FormControl>
              <FormControl id="userName">
                <FormLabel>Usuario</FormLabel>
                <Input
                  placeholder="Nombre de usuario"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Correo Electronico</FormLabel>
                <Input
                  placeholder="No disponible al ingresar con Auth0"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  disabled
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  placeholder="No disponible al ingresar con Auth0"
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                  disabled
                />
              </FormControl>
              <FormControl id="alias">
                <FormLabel>Alias Mercado Pago</FormLabel>
                <Input
                  placeholder="Alias"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  name="alias"
                  onChange={handleChange}
                  value={input.alias}
                />
              </FormControl>
              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => {
                    editProfile();
                  }}
                >
                  Confirmar
                </Button>
              </Stack>
              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={onDeleteUser}
                >
                  Eliminar Cuenta
                </Button>
              </Stack>
              {error ? (
                <Flex mt="4" alignItems="center" justifyContent="center">
                  <Icon as={CheckIcon} color="green.500" mr="2" />
                  <Text as="span" color="green.500" fontWeight="500">
                    {error}
                  </Text>
                </Flex>
              ) : success ? (
                <Flex mt="4" alignItems="center" justifyContent="center">
                  <Icon as={CheckIcon} color="green.500" mr="2" />
                  <Text as="span" color="green.500" fontWeight="500">
                    {success}
                  </Text>
                </Flex>
              ) : null}
            </Stack>
          </Flex>
        ) : isLoggedIn ? (
          <Flex
            h="900px"
            p="0"
            bgSize="cover"
            bgImage="url('/img/landing-wallpaper.jpg')"
            maxW={"100vw"}
            align={"center"}
            justify={"center"}
          >
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                Editar Perfil
              </Heading>
              <FormControl id="userName">
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar size="xl" src={user_detail?.avatar}></Avatar>
                  </Center>
                  <Center w="full">
                    <UploadFiles
                      funcion={"Cambiar Avatar"}
                      titulo={"Subir Imagen"}
                      url={"/users/changeavatar"}
                    />
                  </Center>
                </Stack>
              </FormControl>
              <FormControl id="userName">
                <FormLabel>Usuario</FormLabel>
                <Input
                  placeholder="Nombre de usuario"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={input.username}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Correo Electronico</FormLabel>
                <Input
                  placeholder="Email"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={input.email}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  placeholder="Contraseña"
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={input.password}
                />
              </FormControl>
              <FormControl id="alias">
                <FormLabel>Alias Mercado Pago</FormLabel>
                <Input
                  placeholder="Alias"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  name="alias"
                  onChange={handleChange}
                  value={input.alias}
                />
              </FormControl>
              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => {
                    editProfile();
                  }}
                >
                  Confirmar
                </Button>
              </Stack>
              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={onDeleteUser}
                >
                  Eliminar Cuenta
                </Button>
              </Stack>

              {error !== "" ? (
                <Flex mt="4" alignItems="center" justifyContent="center">
                  <Icon as={FaExclamationCircle} color="red.500" mr="2" />
                  <Text as="span" color="red.500" fontWeight="500">
                    {error}
                  </Text>
                </Flex>
              ) : success ? (
                <Flex mt="4" alignItems="center" justifyContent="center">
                  <Icon as={CheckIcon} color="green.500" mr="2" />
                  <Text as="span" color="green.500" fontWeight="500">
                    {success}
                  </Text>
                </Flex>
              ) : null}
            </Stack>
          </Flex>
        ) : null}
      </Box>
    </>
  );
}
