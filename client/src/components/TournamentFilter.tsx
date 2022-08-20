import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  Container,
  Input,
  IconButton,
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useAppDispatch } from "../redux/hooks";
import {
  fetchFilterTournaments,
  fetchTournaments,
} from "../redux/slices/tournamentSlice";

function TournamentFilter(): JSX.Element {
  const [filter, setFilter] = useState({
    stat: "",
    type: "",
    sort: "",
    name: "",
    searchname: "",
  });
  const dispatch = useAppDispatch();

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

  function handleFilter(e: React.MouseEvent<HTMLButtonElement>) {
    dispatch(fetchFilterTournaments(filter));
  }

  function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    dispatch(fetchFilterTournaments(filter));
    setFilter({
      ...filter,
      searchname: "",
    });
  }

  function deleteFilter(e: React.MouseEvent<HTMLButtonElement>) {
    dispatch(fetchTournaments());
    setFilter({
      stat: "",
      type: "",
      sort: "",
      name: "",
      searchname: "",
    });
    const $select: any = document.querySelector("#status");
    const $option = $select?.querySelector("#alls");
    $select.value = $option.value;
    const $select2: any = document.querySelector("#types");
    const $option2 = $select2?.querySelector("#allt");
    $select2.value = $option2.value;
    const $select3: any = document.querySelector("#sorts");
    const $option3 = $select3?.querySelector("#allsorts");
    $select3.value = $option3.value;
  }

  return (
    <Container>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Input
            name="searchname"
            placeholder="Buscar torneo..."
            value={filter.searchname}
            size="md"
            type="text"
            onChange={handleInputChange}
          />
        </Box>

        <IconButton
          aria-label="Search database"
          icon={<SearchIcon />}
          type="submit"
          onClick={handleSubmit}
        />
      </Flex>

      <select id="status" name="stat" onChange={handleChange}>
        <option id="alls" value="">
          Todos
        </option>
        <option value="INPROGRESS">En progreso</option>
        <option value="CONCLUDED">Finalizado</option>
        <option value="INCOMING">Próximos</option>
      </select>
      <select id="types" name="type" onChange={handleChange}>
        <option id="allt" value="">
          Todos
        </option>
        <option value="PRIVATE">Privados</option>
        <option value="PUBLIC">Públicos</option>
      </select>
      <select id="sorts" name="sort" onChange={handleChange}>
        <option id="allsorts" value="asc">
          Ascendente
        </option>
        <option value="desc">Descendente</option>
        <option value="mostpopular">Más popular</option>
        <option value="leastpopular">Menos popular</option>
      </select>

      <Button colorScheme="teal" size="md" onClick={handleFilter}>
        Aplicar filtros
      </Button>

      <Button colorScheme="teal" size="md" onClick={deleteFilter}>
        Cargar todos
      </Button>
    </Container>
  );
}

export default TournamentFilter;
