import React, { useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function Pagination({
  onPageChange,
  lastPage,
  initalPage,
}: {
  onPageChange: (newPage: number) => void;
  initalPage?: number;
  lastPage?: number;
}) {
  const [page, setPage] = useState(initalPage ? initalPage : 1);

  useEffect(() => {
    onPageChange(page);
  }, [page]);

  return (
    <Flex w="100%" justifyContent="space-between">
      <Button
        onClick={() => setPage((page) => page - 1)}
        disabled={page === 1}
        _hover={{
          color: "primary",
          bg: "secondary",
        }}
        bgColor="buttons"
        color="text"
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
        onClick={() => setPage((page) => page + 1)}
        disabled={
          lastPage !== undefined ? page === lastPage || lastPage === 0 : false
        }
      >
        <ArrowForwardIcon />
      </Button>
    </Flex>
  );
}

export default Pagination;
