import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Textarea,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import api from "../../services/api";

function BanForm(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    admin_name: "",
    password: "",
    user: "",
    reason: "",
  });

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: any) => {
    try {
      const response = await api.put("/users/banuser", {
        admin_name: input.admin_name,
        password: input.password,
        user: input.user,
        reason: input.reason,
        admin_email: props.email,
      });
      console.log(response.data);
      if (response.data === "Usuario baneado correctamente!") {
        setInput({
          ...input,
          admin_name: "",
          password: "",
          user: "",
          reason: "",
        });
        onClose();
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        variant={"link"}
        ml={2}
        color={"text"}
        fontWeight={"light"}
      >
        Banear Usuario
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              minH={"75vh"}
              align={"center"}
              justify={"center"}
              bg={useColorModeValue("gray.50", "gray.800")}
            >
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"} textAlign={"center"}>
                    Formulario de Baneo
                  </Heading>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    utilizalo con responsabilidad ✌️
                  </Text>
                </Stack>
                <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                >
                  <Stack spacing={4}>
                    <HStack>
                      <Box>
                        <FormControl id="firstName" isRequired>
                          <FormLabel>Nombre Admin</FormLabel>
                          <Input
                            type="text"
                            placeholder="Tu nombre"
                            name="admin_name"
                            value={input.admin_name}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="lastName" isRequired>
                          <FormLabel>Usuario a banear</FormLabel>
                          <Input
                            type="text"
                            placeholder="Usuario o Email"
                            name="user"
                            value={input.user}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                      </Box>
                    </HStack>
                    <FormControl id="password" isRequired>
                      <FormLabel>Contraseña</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Ingresa tu contraseña"
                          name="password"
                          value={input.password}
                          onChange={handleInputChange}
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Motivo del ban</FormLabel>
                      <Textarea
                        value={input.reason}
                        onChange={handleInputChange}
                        placeholder="Escribe la razón correspondiente"
                        size="md"
                        borderRadius={"6px"}
                        name={"reason"}
                      />
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                      <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={handleSubmit}
                      >
                        Confirmar Baneo
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BanForm;
