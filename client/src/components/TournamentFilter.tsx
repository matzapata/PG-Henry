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
  }

  function deleteFilter() {
    dispatch(fetchTournaments());
    setFilter(filterInitialState);
  }

  return (
    <Box p="20px" backdropFilter="auto" backdropBrightness="0.5">
      <Stack direction="row" spacing="5px">
        <Input
          name="name"
          placeholder="Buscar torneo..."
          value={filter.name}
          color="text"
          borderColor="buttons"
          w="30%"
          type="text"
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
        <IconButton
          aria-label="Search database"
          bgColor="buttons"
          icon={<SearchIcon />}
          type="submit"
          onClick={handleFilter}
        />
        <Select
          w="20%"
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
          w="20%"
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
          w="20%"
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
        <Button
          _hover={{
            color: "#082032",
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
            color: "#082032",
          }}
          bgColor="buttons"
          color="text"
          size="md"
          onClick={deleteFilter}
        >
          Cargar todos
        </Button>
        <Button
          onClick={() =>
            setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
          }
          name="backbutton"
          disabled={currentPage === 1 ? true : false}
        >
          <ArrowBackIcon />
        </Button>
        <Box bgColor="buttons">{currentPage}</Box>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          name="fowardbutton"
          disabled={currentTournaments.tournaments.length < 10 ? true : false}
        >
          <ArrowForwardIcon />
        </Button>
      </Stack>
    </Box>
  );
}

export default TournamentFilter;
