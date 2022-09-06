import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  Text,
  InputGroup,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchMercadoPago } from "../redux/slices/mercadopago";
import { fetchUniqueUserTournament } from "../redux/slices/userThunk";
import api from "../services/api";

type Password = {
  password: string;
};

function Mercadopago({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user_id = useAppSelector((state) => state.auth.decoded?.id);
  const usermail = useAppSelector((state) => state.auth.decoded?.email);
  const [pass, setPass] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [input, setInput] = useState<Password>({
    password: "",
  });
  const [show, setShow] = React.useState(false);
  const unido = useAppSelector(
    (state) => state.user.userTournaments.is_attached
  );
  const tournamentDetail = useAppSelector(
    (state) => state.tournaments.tournamentDetail
  );

  useEffect(() => {
    dispatch(fetchUniqueUserTournament({ tournamentid: id, userid: user_id }));
  });

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      password: e.target.value,
    });
  }

  async function handlePass() {
    const response = await api.get(
      `/tournaments/password?password=${input.password}&tournamentid=${id}`
    );
    if (response.data === "Ok") {
      setPass(true);
    } else {
      setError(response.data);
    }
  }

  function handleMP() {
    dispatch(
      fetchMercadoPago({
        tournamentid: id,
        userid: user_id,
        useremail: usermail,
      })
    );
  }
  if (
    unido === false &&
    tournamentDetail?.type === "PRIVATE" &&
    tournamentDetail?.status !== "CONCLUDED"
  ) {
    return (
      <Box>
        <Button
          onClick={onOpen}
          mr={3}
          _hover={{
            color: "primary",
          }}
          bgColor="buttons"
          color="text"
        >
          Unirse
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          {pass === true ? (
            <ModalContent>
              <ModalHeader>Unete comprando con mercadopago!</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Te redireccionaremos a Mercadopago asi puedes realizar tu compra
                por 200 pesos argentinos!
              </ModalBody>

              <ModalFooter>
                <Button onClick={handleMP} mr={3}>
                  Ir a mercadopago
                </Button>
                <Button onClick={onClose} colorScheme="blue" mr={3}>
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          ) : (
            <ModalContent>
              <ModalBody>
                Para continuar debes ingresar la contraseña.
              </ModalBody>
              <ModalCloseButton />
              <InputGroup size="md">
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Ingrese la contraseña"
                  mr={3}
                  name="password"
                  onChange={handleInput}
                ></Input>
              </InputGroup>
              {error === "Contraseña incorrecta" ? (
                <Text mr={3} color={"red"}>
                  Contraseña incorrecta
                </Text>
              ) : (
                <Text></Text>
              )}
              <ModalFooter>
                <Button onClick={handlePass} mr={3}>
                  Aceptar
                </Button>
                <Button onClick={onClose} colorScheme="blue" mr={3}>
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          )}
        </Modal>
      </Box>
    );
  } else if (
    unido === false &&
    tournamentDetail?.type === "PUBLIC" &&
    tournamentDetail?.status !== "CONCLUDED"
  ) {
    return (
      <Box>
        <Button
          onClick={onOpen}
          mr={3}
          _hover={{
            color: "primary",
          }}
          bgColor="buttons"
          color="text"
        >
          Unirse
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Unete comprando con mercadopago!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Te redireccionaremos a Mercadopago asi puedes realizar tu compra
              por 200 pesos argentinos!
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleMP} mr={3}>
                Ir a mercadopago
              </Button>
              <Button onClick={onClose} colorScheme="blue" mr={3}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  } else {
    return null;
  }
}

export default Mercadopago;
