import {
  Text,
  Stack,
  Input,
  IconButton,
  Button,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchFilterTournaments } from "../redux/slices/tournamentThunk";
import TournamentCard from "../components/TournamentCard";
import { SearchIcon } from "@chakra-ui/icons";

const filterInitialState = {
  type: "PUBLIC",
  stat: "",
  sort: "",
  name: "",
};

function PublicTournaments(): JSX.Element {
  const currentTournaments = useAppSelector((state) => state.tournaments);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState(filterInitialState);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchFilterTournaments(filter));
  }, []);

  function handleSubmit() {
    dispatch(
      fetchFilterTournaments({
        ...filter,
        name: search,
      })
    );
    setFilter(filterInitialState);
  }

  function deleteFilter() {
    setFilter(filterInitialState);
    dispatch(fetchFilterTournaments(filterInitialState));
  }

  return (
    <>
      <Heading
        size="lg"
        color="DText"
        fontFamily="heading"
        fontWeight="thin"
        textTransform={"uppercase"}
      >
        Torneos Publicos
      </Heading>

      <Stack direction="row" spacing="5px" my="4">
        <Input
          name="searchname"
          placeholder="Buscar torneo..."
          value={search}
          color="text"
          borderColor="buttons"
          w="30%"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          aria-label="Search database"
          bgColor="buttons"
          icon={<SearchIcon />}
          type="submit"
          onClick={handleSubmit}
        />
        <Button
          _hover={{
            color: "primary",
          }}
          bgColor="buttons"
          color="text"
          size="md"
          onClick={deleteFilter}
        >
          Cargar todos
        </Button>
      </Stack>

      {!currentTournaments.loading && currentTournaments.error && (
        <Text>Error: {currentTournaments.error}</Text>
      )}
      {currentTournaments.tournaments?.map((el) => (
        <TournamentCard
          key={el.id}
          id={el.id}
          name={el.name}
          status={el.status}
          type={el.type}
          logo={el.logo_url}
        />
      ))}
    </>
  );
}
export default PublicTournaments;
