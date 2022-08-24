import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useAppDispatch } from "../redux/hooks";
import { fetchMercadoPago } from "../redux/slices/mercadopago";

function Mercadopago(): JSX.Element {
  const dispatch = useAppDispatch();

  function handleMP() {
    dispatch(fetchMercadoPago());
  }

  return (
    <Box>
      <Button onClick={handleMP}>Mercadopago</Button>
    </Box>
  );
}

export default Mercadopago;
