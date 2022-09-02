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
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getAllComments, deleteComment } from "../../redux/slices/adminThunk";
import api from "../../services/api";

function ReviewsTable(props: any) {
  const ITEMS_PAGINA = 25;
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.admin.allComments);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(getAllComments());
  }, []);

  useEffect(() => {
    setItems([...reviews].splice(0, ITEMS_PAGINA));
  }, [reviews]);

  const borrar = async (id: any) => {
    dispatch(deleteComment({ id }));
    alert(`Felicitaciones, se ha borrado el comentario`);
    dispatch(getAllComments());
  };

  const nextHandler = () => {
    const total_elementos = reviews.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * ITEMS_PAGINA;
    if (firstIndex + 1 > total_elementos) return;

    setItems([...reviews].splice(firstIndex, ITEMS_PAGINA));
    setCurrentPage(nextPage);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;

    const firstIndex = prevPage * ITEMS_PAGINA;
    setItems([...reviews].splice(firstIndex, ITEMS_PAGINA));
    setCurrentPage(prevPage);
  };

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Usuario</Th>
              <Th>Email</Th>
              <Th>Comentario</Th>
              <Th>Funcion</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((u: any, i) => (
              <Tr key={i}>
                <Td>
                  <Flex alignItems={"center"}>
                    <Image width={"40px"} src={`${u.url_avatar}`} mr="1rem" />
                    {u.username}
                  </Flex>
                </Td>
                <Td>{u.email}</Td>
                <Td>{u.comentario}</Td>
                <Td>
                  <Button fontSize={"12.5px"} onClick={(e) => borrar(u.id)}>
                    BORRAR
                  </Button>
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

export default ReviewsTable;
