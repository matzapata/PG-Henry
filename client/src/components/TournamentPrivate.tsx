import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Input,
  Text,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useParams } from "react-router-dom";
import { tournamentPassword } from "../redux/slices/tournamentThunk";
import { fetchUniqueUserTournament } from "../redux/slices/userThunk";

type Password = {
  password: string;
};

function PrivatePassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const user_id = useAppSelector((state) => state.auth.decoded?.id);
  const [input, setInput] = useState<Password>({
    password: "",
  });
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
  function handlePass() {
    const params = {
      tournamentid: id as string,
      password: input.password,
      userid: user_id as string,
    };
    dispatch(tournamentPassword(params));
  }

  if (unido === false && tournamentDetail?.type === "PRIVATE") {
    return (
      <Box>
        <Button onClick={onOpen} mr={3}>
          Ingresar contraseña
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Ingresa la contraseña para entrar a este torneo.
            </ModalHeader>
            <ModalCloseButton />
            <Input name="password" onChange={handleInput}></Input>

            <ModalFooter>
              <Button onClick={handlePass} mr={3}>
                Aceptar
              </Button>
              <Button onClick={onClose} colorScheme="blue" mr={3}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  } else if (unido === true && tournamentDetail?.type === "PRIVATE") {
    return <Text color={"white"}>Ya estas unido!</Text>;
  } else {
    return <Box></Box>;
  }
}

export default PrivatePassword;
