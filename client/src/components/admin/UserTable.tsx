import React, { useEffect } from "react";
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
  const dispatch = useAppDispatch();
  const banned = useAppSelector((state) => state.admin.bannedUsers);

  useEffect(() => {
    dispatch(getBannedUser());
  }, []);

  const desbanear = (email: string) => {
    dispatch(unbanUser({ email }));
    alert(`Felicitaciones, se ha desbaneado al usuario ${email}`);
    window.location.reload();
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
            {banned.map((u: any, i) => (
              <Tr key={i}>
                <Td>
                  <Flex alignItems={"center"}>
                    <Image width={"40px"} src={`${u.url_avatar}`} />
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
        </Table>
      </TableContainer>
    </>
  );
}

export default UserTable;
