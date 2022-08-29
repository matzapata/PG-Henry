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

function TournamentFilter(): JSX.Element {
  const [filter, setFilter] = useState({
    stat: "",
    type: "",
    sort: "asc",
    name: "",
    searchname: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const currentTournaments = useAppSelector((state) => state.tournaments);

  useEffect(() => {
    dispatch(fetchFilterTournaments({ ...filter, page: currentPage }));
  }, [currentPage]);

  useEffect(() => {
    dispatch(fetchFilterTournaments({ ...filter, page: 1 }));
  }, []);

  useEffect(() => {
    handleFilter();
  }, [filter]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
      name: e.target.value,
    });
  }

  function handleFilter() {
    dispatch(fetchFilterTournaments(filter));
  }

  function handleSubmit() {
    dispatch(fetchFilterTournaments(filter));
    setFilter({
      ...filter,
      searchname: "",
    });
  }

  function previousPage() {
    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
  }
  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function deleteFilter() {
    dispatch(fetchTournaments());
    setFilter({
      stat: "",
      type: "",
      sort: "",
      name: "",
      searchname: "",
    });
  }

  return (
    <Box p="20px" backdropFilter="auto" backdropBrightness="0.5">
      <Stack direction="row" spacing="5px">
        <Input
          name="searchname"
          placeholder="Buscar torneo..."
          value={filter.searchname}
          color="#F7F7F7"
          borderColor="#4FBDBA"
          w="30%"
          type="text"
          onChange={handleInputChange}
        />
        <IconButton
          aria-label="Search database"
          bgColor="#4FBDBA"
          icon={<SearchIcon />}
          type="submit"
          onClick={handleSubmit}
        />
        <Select
          w="20%"
          color="#F7F7F7"
          borderColor="#4FBDBA"
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
          color="#F7F7F7"
          borderColor="#4FBDBA"
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
          color="#F7F7F7"
          borderColor="#4FBDBA"
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
          bgColor="#4FBDBA"
          color="#F7F7F7"
          size="md"
          onClick={handleFilter}
        >
          Aplicar filtros
        </Button>
        <Button
          _hover={{
            color: "#082032",
          }}
          bgColor="#4FBDBA"
          color="#F7F7F7"
          size="md"
          onClick={deleteFilter}
        >
          Cargar todos
        </Button>
        <Button
          onClick={previousPage}
          name="backbutton"
          disabled={currentPage === 1 ? true : false}
        >
          <ArrowBackIcon />
        </Button>
        <Box bgColor="#4FBDBA">{currentPage}</Box>
        <Button
          onClick={nextPage}
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
