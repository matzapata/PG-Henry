import {
  Heading,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchTournamentMatches } from "../redux/slices/tournamentThunk";

function TournamentMatches({ id }: { id: string }) {
  const matches = useAppSelector(
    (state) => state.tournaments.tournamentMatches
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTournamentMatches(id));
  }, [id]);

  return (
    <TableContainer>
      <Table variant="simple">
        <Tbody>
          {matches.map((e) => (
            <Tr key={e.id}>
              <Td>
                <HStack>
                  <Image src={e.team_a.shield_url} w={10} h={10} />
                  <Heading fontSize="md" color="white">
                    {e.team_a.name}
                  </Heading>
                </HStack>
              </Td>
              <Td textAlign="center" fontSize="md" color="white">
                {e.score_a} - {e.score_b}
              </Td>
              <Td>
                <HStack justifyContent="flex-end">
                  <Heading fontSize="md" color="white">
                    {e.team_b.name}
                  </Heading>
                  <Image src={e.team_b.shield_url} w={10} h={10} />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TournamentMatches;
