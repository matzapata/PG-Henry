import { CloseIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  IconButton,
  Image,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchTournamentMatches } from "../redux/slices/tournamentThunk";
import Pagination from "./Pagination";

function TournamentMatches({ id }: { id: string }) {
  const [stage, setStage] = useState("");
  const tournamentMatches = useAppSelector(
    (state) => state.tournaments.tournamentMatches
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    stage !== ""
      ? dispatch(fetchTournamentMatches({ id, page: 1, pageSize: 5, stage }))
      : dispatch(fetchTournamentMatches({ id, page: 1, pageSize: 5 }));
  }, [stage]);

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setStage(e.target.value);
  }

  function onClick() {
    dispatch(fetchTournamentMatches({ id, page: 1, pageSize: 5 }));
  }

  return (
    <TableContainer pt={5}>
      <HStack spacing={2}>
        <Select
          color="text"
          placeholder="Etapa..."
          onChange={(e) => onChange(e)}
        >
          <option value="ROUNDOF32">ELIMINACIONES</option>
          <option value="ROUNDOF16">OCTAVOS-FINAL</option>
          <option value="QUARTERFINAL">CUARTOS-FINAL</option>
          <option value="SEMIFINAL">SEMI-FINAL</option>
          <option value="FINAL">FINAL</option>
        </Select>
        <IconButton
          onClick={() => onClick()}
          colorScheme="blue"
          aria-label="Clear Filters"
          icon={<CloseIcon />}
        />
      </HStack>
      <Table variant="simple" mb={5}>
        <Tbody>
          {tournamentMatches.matches?.map((e) => (
            <Tr key={e.id}>
              <Td pl={0}>
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
              <Td pr={0}>
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
      <Pagination
        lastPage={tournamentMatches?.lastPage}
        onPageChange={(page) => {
          dispatch(fetchTournamentMatches({ id, page, pageSize: 5 }));
        }}
      />
    </TableContainer>
  );
}

export default TournamentMatches;
