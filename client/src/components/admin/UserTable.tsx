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
import { getBannedUser, unbanUser } from "../../redux/slices/adminThunk";

function UserTable(props: any) {
  const ITEMS_PAGINA = 25;
  const dispatch = useAppDispatch();
  const banned = useAppSelector((state) => state.admin.bannedUsers);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(getBannedUser());
  }, []);

  useEffect(() => {
    setItems([...banned].splice(0, ITEMS_PAGINA));
  }, [banned]);

  const desbanear = (email: string) => {
    dispatch(unbanUser({ email }));
    alert(`Felicitaciones, se ha desbaneado al usuario ${email}`);
    dispatch(getBannedUser());
  };

  const nextHandler = () => {
    const total_elementos = banned.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * ITEMS_PAGINA;
    if (firstIndex + 1 > total_elementos) return;

    setItems([...banned].splice(firstIndex, ITEMS_PAGINA));
    setCurrentPage(nextPage);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;

    const firstIndex = prevPage * ITEMS_PAGINA;
    setItems([...banned].splice(firstIndex, ITEMS_PAGINA));
    setCurrentPage(prevPage);
  };

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Usuario</Th>
              <Th>Nombre</Th>
              <Th>Email</Th>
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
                <Td>{u.full_name}</Td>
                <Td>{u.email}</Td>
                <Td>
                  <Button
                    fontSize={"12.5px"}
                    onClick={(e) => {
                      desbanear(u.email);
                    }}
                  >
                    DESBANEAR
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

export default UserTable;
