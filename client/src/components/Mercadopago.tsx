import React from "react";
import {
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
import { useAppDispatch } from "../redux/hooks";
import { fetchMercadoPago } from "../redux/slices/mercadopago";

function Mercadopago(): JSX.Element {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleMP() {
    dispatch(fetchMercadoPago());
  }

  return (
    <Box>
      <Button onClick={onOpen}>Unirse</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Unete comprando con mercadopago!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Te redireccionaremos a Mercadopago asi puedes realizar tu compra!
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleMP} mr={3}>
              Comprar
            </Button>
            <Button onClick={onClose} colorScheme="blue" mr={3}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Mercadopago;
