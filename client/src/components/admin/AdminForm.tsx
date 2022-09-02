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

function AdminFormulary(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState({
    email: "",
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
      const response = await api.put("/users/formAdmin", {
        email: input.email,
      });
      console.log(response.data);
      if (
        response.data === "Usuario asignado como administrador correctamente!"
      ) {
        setInput({
          ...input,
          email: "",
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
        Crear Administrador
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
                    Formulario de Crear Administrador
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
                        <FormControl id="lastName" isRequired>
                          <FormLabel>
                            Usuario a asignar como administrador
                          </FormLabel>
                          <Input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={input.email}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                      </Box>
                    </HStack>
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
                        Confirmar
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

export default AdminFormulary;
