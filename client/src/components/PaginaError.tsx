import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

export default function ErrorScreen() {
  return (
    <>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="300px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Error de ingreso al Torneo!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Lamentablemente no has podido unirte al torneo seleccionado... Por
          favor intenta nuevamente
          <Flex justifyContent={"center"} mt="10px">
            <Button as={ReactLink} to={"/torneos"}>
              Torneos
            </Button>
          </Flex>
        </AlertDescription>
      </Alert>
    </>
  );
}
