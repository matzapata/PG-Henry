import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Image,
  Flex,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  deleteTournament,
  getActiveTournaments,
} from "../../redux/slices/adminThunk";

function TournamentTable(props: any) {
  const ITEMS_PAGINA = 10;
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.admin.activeTournaments);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getActiveTournaments());
    console.log(tournaments);
  }, []);

  useEffect(() => {
    setItems([...tournaments].splice(0, ITEMS_PAGINA));
  }, [tournaments]);

  const eliminar = (id: string) => {
    dispatch(deleteTournament({ id }));
    onClose();
    dispatch(getActiveTournaments());
  };

  const nextHandler = () => {
    const total_elementos = tournaments.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * ITEMS_PAGINA;
    if (firstIndex + 1 > total_elementos) return;

    setItems([...tournaments].splice(firstIndex, ITEMS_PAGINA));
    setCurrentPage(nextPage);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;

    const firstIndex = prevPage * ITEMS_PAGINA;
    setItems([...tournaments].splice(firstIndex, ITEMS_PAGINA));
    setCurrentPage(prevPage);
  };

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Torneo</Th>
              <Th>Estado</Th>
              <Th>Tipo</Th>
              <Th>Pozo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((e: any, i) => (
              <Tr key={i}>
                <Td>
                  <Flex alignItems={"center"}>
                    <Image width={"40px"} src={`${e.logo_url}`} mr="1rem" />
                    {e.name}
                  </Flex>
                </Td>
                <Td>{e.status}</Td>
                <Td>{e.type}</Td>
                <Td>{e.pool}</Td>
                <Td>
                  <Button fontSize={"12.5px"} onClick={onOpen}>
                    Eliminar
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Advertencia!</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text>
                          Seguro que queres eliminar el torneo {e.name} ?
                        </Text>
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Cancelar
                        </Button>
                        <Button
                          fontSize={"12.5px"}
                          onClick={() => {
                            eliminar(e.id);
                          }}
                        >
                          Eliminar
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>
                <Flex mr={"5rem"} justifyContent={"center"}>
                  <Button onClick={prevHandler}>Anterior</Button>
                </Flex>
              </Td>
              <Td></Td>
              <Td></Td>
              <Td>
                <Flex justifyContent={"center"}>
                  <Button onClick={nextHandler}>Siguiente</Button>
                </Flex>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}

export default TournamentTable;
