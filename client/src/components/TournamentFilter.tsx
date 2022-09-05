import React, { useEffect } from "react";
import { SearchIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  Input,
  IconButton,
  Box,
  Button,
  Select,
  Stack,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchFilterTournaments,
  fetchTournaments,
} from "../redux/slices/tournamentThunk";

const filterInitialState = {
  stat: "",
  type: "",
  sort: "asc",
  name: "",
  page: 1,
};

function TournamentFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState(filterInitialState);
  const [currentPage, setCurrentPage] = useState(1);
  const currentTournaments = useAppSelector((state) => state.tournaments);

  useEffect(() => {
    dispatch(fetchFilterTournaments({ ...filter, page: currentPage }));
  }, [currentPage]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  function handleFilter() {
    dispatch(fetchFilterTournaments(filter));
    setCurrentPage(1);
  }

  function deleteFilter() {
    dispatch(fetchTournaments());
    setFilter(filterInitialState);
    setCurrentPage(1);
  }

  return (
    <Box p="20px" backdropFilter="auto" backdropBrightness="0.5">
      <Stack
        direction={["column", "column", "column", "row"]}
        spacing="10px"
        justifyContent={"space-between"}
      >
        <HStack spacing={2}>
          <Input
            name="name"
            placeholder="Buscar torneo..."
            value={filter.name}
            color="text"
            borderColor="buttons"
            type="text"
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          />
          <IconButton
            _hover={{
              color: "primary",
              bg: "secondary",
            }}
            bgColor="buttons"
            color="text"
            aria-label="Search database"
            icon={<SearchIcon />}
            type="submit"
            onClick={handleFilter}
          />
        </HStack>
        <Select
          w={["100%", "100%", "100%", "280px"]}
          color="text"
          borderColor="buttons"
          placeholder="Estado"
          id="status"
          name="stat"
          value={filter.stat}
          onChange={handleChange}
        >
          <option id="alls" value="">
            Todos
          </option>
          <option value="INPROGRESS">En progreso</option>
          <option value="CONCLUDED">Finalizado</option>
          <option value="INCOMING">Próximos</option>
        </Select>
        <Select
          w={["100%", "100%", "100%", "280px"]}
          color="text"
          borderColor="buttons"
          placeholder="Acceso"
          id="types"
          name="type"
          value={filter.type}
          onChange={handleChange}
        >
          <option id="allt" value="">
            Todos
          </option>
          <option value="PRIVATE">Privados</option>
          <option value="PUBLIC">Públicos</option>
        </Select>
        <Select
          w={["100%", "100%", "100%", "280px"]}
          color="text"
          borderColor="buttons"
          id="sorts"
          name="sort"
          value={filter.sort}
          onChange={handleChange}
        >
          <option id="allsorts" value="asc">
            Ascendente
          </option>
          <option value="desc">Descendente</option>
          <option value="mostpopular">Más popular</option>
          <option value="leastpopular">Menos popular</option>
        </Select>
        <Stack direction={["column", "row"]}>
          <Button
            _hover={{
              color: "primary",
              bg: "secondary",
            }}
            bgColor="buttons"
            color="text"
            size="md"
            onClick={handleFilter}
          >
            Aplicar filtros
          </Button>
          <Button
            _hover={{
              color: "primary",
              bg: "secondary",
            }}
            bgColor="buttons"
            color="text"
            size="md"
            onClick={deleteFilter}
          >
            Cargar todos
          </Button>
          <Flex>
            <Button
              _hover={{
                color: "primary",
                bg: "secondary",
              }}
              bgColor="buttons"
              color="text"
              mr="2"
              onClick={() =>
                setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
              }
              name="backbutton"
              disabled={currentPage === 1 ? true : false}
            >
              <ArrowBackIcon />
            </Button>
            <Button
              _hover={{
                color: "primary",
                bg: "secondary",
              }}
              bgColor="buttons"
              color="text"
              onClick={() => setCurrentPage(currentPage + 1)}
              name="fowardbutton"
              disabled={
                currentTournaments.tournaments.length < 12 ? true : false
              }
            >
              <ArrowForwardIcon />
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Box>
  );
}

export default TournamentFilter;
