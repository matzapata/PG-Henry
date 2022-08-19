import React from "react";
import { useState } from "react";
import { Container } from "@chakra-ui/react";
import { useAppDispatch } from "../redux/hooks";
import { fetchFilterTournaments } from "../redux/slices/tournamentSlice";

function TournamentFilter(): JSX.Element {
  const [filter, setFilter] = useState({
    stat: "",
    type: "",
  });
  const dispatch = useAppDispatch();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  function handleFilter(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch(fetchFilterTournaments(filter));
  }

  return (
    <Container>
      <select name="stat" onChange={handleChange}>
        <option value="">Todos</option>
        <option value="INPROGRESS">En progreso</option>
        <option value="CONCLUDED">Finalizado</option>
        <option value="INCOMING">Próximos</option>
      </select>
      <select name="type" onChange={handleChange}>
        <option value="">Todos</option>
        <option value="PRIVATE">Privados</option>
        <option value="PUBLIC">Públicos</option>
      </select>
      <button onClick={handleFilter}>Aplicar filtros</button>
    </Container>
  );
}

export default TournamentFilter;
