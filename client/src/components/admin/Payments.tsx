import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
} from "@chakra-ui/react";
import api from "../../services/api";
import { Link as ReactLink } from "react-router-dom";

type Payment = {
  position: "FIRST" | "SECOND" | "THIRD";
  user_tournament_id: string;
  compensation: number;
  email: string;
  full_name: string;
  tournament: {
    id: string;
    name: string;
    pool: number;
  };
};

function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    api.get("/admin/payments/pending").then((res) => {
      setPayments(res.data);
    });
  }, []);

  const completePayment = async (id: string) => {
    setLoading([...loading, id]);
    try {
      const confirmation = confirm("¿Desea marcar el pago como realizado?");
      if (confirmation) {
        await api.put(`/admin/payments/${id}/collected`);
        setDone([...done, id]);
      }
    } catch (e: any) {
      console.log(e);
      alert(e.response.data);
    } finally {
      setLoading(loading.filter((i) => i !== id));
    }
  };

  return (
    <TableContainer border="1px" borderColor="gray.200" borderRadius="2">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Tournament</Th>
            <Th>Position</Th>
            <Th isNumeric>Compensation</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {payments.map((p, i) => (
            <Tr key={i}>
              <Td>{p.full_name}</Td>
              <Td>{p.email}</Td>
              <Td>
                <Link as={ReactLink} to={`/torneos/${p.tournament.id}`}>
                  {p.tournament.name}
                </Link>
              </Td>
              <Td>{p.position}</Td>
              <Td>{p.compensation}</Td>
              <Td>
                <Button
                  size="sm"
                  isLoading={loading.includes(p.user_tournament_id)}
                  isDisabled={done.includes(p.user_tournament_id)}
                  onClick={() => completePayment(p.user_tournament_id)}
                >
                  Done
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Payments;
