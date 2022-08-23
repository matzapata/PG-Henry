import React, { useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  Input,
  IconButton,
  Box,
  Button,
  Select,
  Stack,
  color,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
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
  const [state, setState] = useState({
    selectedValue: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
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
    const select: any = document.querySelector("#status");
    const option = select?.querySelector("#alls");
    select.value = option.value;
    const select2: any = document.querySelector("#types");
    const option2 = select2?.querySelector("#allt");
    select2.value = option2.value;
    const select3: any = document.querySelector("#sorts");
    const option3 = select3?.querySelector("#allsorts");
    select3.value = option3.value;
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
          value={state.selectedValue}
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
          value={state.selectedValue}
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
          value={state.selectedValue}
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
          atra
        </Button>
        <Box bgColor="#4FBDBA">{currentPage}</Box>
        <Button
          onClick={nextPage}
          name="fowardbutton"
          disabled={currentTournaments.tournaments.length < 9 ? true : false}
        >
          adelant
        </Button>
      </Stack>
    </Box>
  );
}

export default TournamentFilter;
