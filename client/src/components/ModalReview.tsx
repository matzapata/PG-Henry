import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { Rating } from "react-simple-star-rating";
import api from "../services/api";
import { useAppSelector } from "../redux/hooks";

function ModalReview() {
  const infoDecoded = useAppSelector((state) => state.auth.decoded);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [rating, setRating] = useState(0);
  const [input, setInput] = useState({
    titulo: "",
    comentario: "",
  });

  const handleInputChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = async (e: any) => {
    const response = await api.post(`/feedback/${infoDecoded?.id}/comments`, {
      stars: rating,
      comentaries: input.comentario,
      titulo: input.titulo,
    });
    if (response.data.message === "Comment created successfully") {
      setRating(0);
      setInput({
        ...input,
        titulo: "",
        comentario: "",
      });
      onClose();
      window.location.reload();
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        bg="buttons"
        color={"text"}
        _hover={{
          bg: "secondary",
          color: "primary",
        }}
      >
        Califícanos
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dejanos tu comentario!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Titulo"
                value={input.titulo}
                onChange={handleInputChange}
                name={"titulo"}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Comentario</FormLabel>
              <Textarea
                value={input.comentario}
                onChange={handleInputChange}
                placeholder="Escribe tu opinion"
                size="md"
                borderRadius={"6px"}
                name={"comentario"}
              />
            </FormControl>
            <Box marginTop={"15px"}>
              <Rating
                onClick={handleRating}
                ratingValue={rating}
                transition={true}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Enviar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalReview;
