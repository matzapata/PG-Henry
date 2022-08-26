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
} from "@chakra-ui/react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import UploadFiles from "../components/UploadFile";
import {
  changePassword,
  deleteActiveUser,
  getUserInfo,
} from "../redux/slices/userThunk";
import history from "../utils/history";
import { signOut } from "../redux/slices/authThunk";
import { FaExclamationCircle } from "react-icons/fa";

export default function UserProfileEdit(): JSX.Element {
  const { user, isAuthenticated, logout } = useAuth0();
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  let error_message = useAppSelector((state) => state.user.error);
  const success = useAppSelector((state) => state.user.message);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const user_detail = useAppSelector((state) => state.user.userDetail);
  const userid: any = useAppSelector((state) => state.auth.decoded?.id);

  function onDeleteUser() {
    if (isLoggedIn) dispatch(deleteActiveUser({ id: userid, is_active: true }));
    if (isLoggedIn) dispatch(signOut());
    else if (isAuthenticated) logout();
    history.push("/");
  }

  useEffect(() => {
    if (isLoggedIn) dispatch(getUserInfo(null));
    if (isAuthenticated) dispatch(getUserInfo(null));

    if (success)
      setTimeout(() => {
        window.location.reload();
      }, 1500);
  }, [user_detail.avatar, success]);

  return (
    <>
      {isLoggedIn ? (
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
                  <Avatar size="xl" src={user_detail.avatar}>
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
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
            <FormControl id="userName" isRequired>
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
                placeholder="Email"
                _placeholder={{ color: "gray.500" }}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                placeholder="Contraseña"
                _placeholder={{ color: "gray.500" }}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
                  error_message = "";
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
                onClick={async () => {
                  await dispatch(changePassword({ email, password }));
                  setEmail("");
                  setPassword("");
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

            {error_message ? (
              <Flex mt="4" alignItems="center" justifyContent="center">
                <Icon as={FaExclamationCircle} color="red.500" mr="2" />
                <Text as="span" color="red.500" fontWeight="500">
                  {error_message}
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
      ) : isAuthenticated ? (
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
                  <Avatar size="xl" src={user?.picture}>
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
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
            <FormControl id="userName" isRequired>
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
                placeholder="Email"
                _placeholder={{ color: "gray.500" }}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                placeholder="Contraseña"
                _placeholder={{ color: "gray.500" }}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={true}
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
                  error_message = "";
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
                onClick={async () => {
                  await dispatch(changePassword({ email, password }));
                  setEmail("");
                  setPassword("");
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

            {error_message ? (
              <Flex mt="4" alignItems="center" justifyContent="center">
                <Icon as={FaExclamationCircle} color="red.500" mr="2" />
                <Text as="span" color="red.500" fontWeight="500">
                  {error_message}
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
    </>
  );
}
