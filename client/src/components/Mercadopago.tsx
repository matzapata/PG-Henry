import React, { useEffect } from "react";
import {
  Text,
  Box,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchMercadoPago } from "../redux/slices/mercadopago";
import { fetchUniqueUserTournament } from "../redux/slices/userThunk";

function Mercadopago({ id }: { id: string }): JSX.Element {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user_id = useAppSelector((state) => state.auth.decoded?.id);
  const usermail = useAppSelector((state) => state.auth.decoded?.email);
  const unido = useAppSelector(
    (state) => state.user.userTournaments.is_attached
  );
  const tournamentDetail = useAppSelector(
    (state) => state.tournaments.tournamentDetail
  );

  useEffect(() => {
    dispatch(fetchUniqueUserTournament({ tournamentid: id, userid: user_id }));
  });

  function handleMP() {
    dispatch(
      fetchMercadoPago({
        tournamentid: id,
        userid: user_id,
        useremail: usermail,
      })
    );
  }
  if (unido === false && tournamentDetail?.type === "PUBLIC") {
    return (
      <Box>
        <Button
          onClick={onOpen}
          bgColor="buttons"
          color="text"
          _hover={{
            bg: "secondary",
            color: "primary",
          }}
          size="md"
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
  } else if (unido === true && tournamentDetail?.type === "PUBLIC") {
    return (
      <Box>
        <Text color="white">Ya estas unido!!</Text>
      </Box>
    );
  } else {
    return <Box></Box>;
  }
}

export default Mercadopago;
