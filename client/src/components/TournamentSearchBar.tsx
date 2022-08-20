import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Input, Spacer } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchByName } from "../redux/slices/tournamentSlice";

function TournametsSearchBar() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(fetchByName(input));
    setInput("");
  }

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Input
          placeholder="Buscar torneo..."
          size="md"
          value={input}
          type="text"
          onChange={(e) => handleInputChange(e)}
        />
      </Box>
      <IconButton
        aria-label="Search database"
        icon={<SearchIcon />}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      />
    </Flex>
  );
}

export default TournametsSearchBar;
