import React, { useEffect } from "react";
import { Text, Button, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <Text>Te has unido correctamente!</Text>
      <Link to={`/torneos/${id}`}>
        <Button>Ir a tu torneo!</Button>
      </Link>
    </Box>
  );
}

export default PaymentSuccess;
