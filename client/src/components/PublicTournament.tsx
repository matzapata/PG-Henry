import {
  Box,
  Container,
  Grid,
  Text,
  Stack,
  Input,
  IconButton,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchFilterTournaments } from "../redux/slices/tournamentThunk";
import TournamentCard from "../components/TournamentCard";
import { SearchIcon } from "@chakra-ui/icons";

function PublicTournaments(): JSX.Element {
  const currentTournamets = useAppSelector((state) => state.tournaments);
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState({
    stat: "",
    type: "",
    sort: "",
    name: "",
    searchname: "",
  });
  const filter = {
    type: "PUBLIC",
    stat: "",
    sort: "",
    name: "",
  };

  useEffect(() => {
    dispatch(fetchFilterTournaments(filter));
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      name: e.target.value,
    });
  }

  function handleSubmit() {
    dispatch(fetchFilterTournaments(filters));
    setFilters({
      ...filters,
      searchname: "",
    });
  }
  function deleteFilter() {
    dispatch(fetchFilterTournaments(filters));
    setFilters({
      stat: "",
      type: "",
      sort: "",
      name: "",
      searchname: "",
    });
  }
  return (
    <Container maxW="100vw" h="950px" bgSize="cover" p="0">
      <Box p="20px" backdropBrightness="0.5">
        <Stack direction="row" spacing="5px">
          <Input
            name="searchname"
            placeholder="Buscar torneo..."
            value={filters.searchname}
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
        </Stack>
      </Box>
      {!currentTournamets.loading && currentTournamets.error ? (
        <Text>Error: {currentTournamets.error}</Text>
      ) : null}
      <Grid templateColumns="repeat(3, 3fr)" gap={10} m="20px" pt="50px">
        {currentTournamets.tournaments &&
          currentTournamets.tournaments.map((el) => (
            <TournamentCard
              key={el.id}
              id={el.id}
              name={el.name}
              status={el.status}
              type={el.type}
              logo={el.logo_url}
            />
          ))}
      </Grid>
    </Container>
  );
}
export default PublicTournaments;
