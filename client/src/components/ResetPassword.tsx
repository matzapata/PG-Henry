import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import api from "../services/api";

function ResetPassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const submit = async () => {
    try {
      await api.put("/users/resetpass", { email: email });
      setEmail("");
      alert("Solicitud exitosa, revisa tu correo!");
      onClose();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <>
      <Button onClick={onOpen} fontWeight="light" variant={"link"}>
        Recupera tu contraseña
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              minH={"20vh"}
              align={"center"}
              justify={"center"}
              bg={useColorModeValue("gray.50", "gray.800")}
              mt={"1.5rem"}
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
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                  Perdiste tu contraseña?
                </Heading>
                <Text
                  fontSize={"sm"}
                  color={useColorModeValue("gray.800", "gray.400")}
                >
                  Te enviaremos un correo para restablecer tu contraseña
                </Text>
                <FormControl id="email">
                  <Input
                    placeholder="Ingresa tu correo"
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={submit}
                  >
                    Solicitar nueva contraseña
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ResetPassword;
