import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Text } from "@chakra-ui/react";

interface CardProps {
  id: string;
  name: string;
  status: string;
  type: string;
}

function TournamentCard({ id, name, status, type }: CardProps): JSX.Element {
  return (
    <Container>
      <Link to={`/tournaments/${id}`}>
        <Box>
          <Text>{name}</Text>
          {status === "INPROGRESS" && <Text>En progreso</Text>}
          {status === "CONCLUDED" && <Text>Finalizado</Text>}
          {status === "INCOMING" && <Text>Proximamente</Text>}
          {type === "PRIVATE" ? <Text>Privado</Text> : <Text>Publico</Text>}
        </Box>
      </Link>
    </Container>
  );
}

export default TournamentCard;
