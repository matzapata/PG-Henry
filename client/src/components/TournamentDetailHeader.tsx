import React, { useEffect } from "react";
import { Flex, Heading, HStack, Image, Tag, Text } from "@chakra-ui/react";
import { fetchTournamentDetail } from "../redux/slices/tournamentThunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

function TournamentDetailHeader({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const tournamentDetail = useAppSelector(
    (state) => state.tournaments.tournamentDetail
  );

  useEffect(() => {
    dispatch(fetchTournamentDetail(id));
  }, [id]);

  return (
    <>
      <Flex alignItems="center">
        <Image
          h="14"
          w="14"
          objectFit="cover"
          borderColor="gray.400"
          border="2px"
          borderRadius="2"
          src={tournamentDetail?.logo_url}
        />
        <Flex direction="column" ml="4">
          <Heading size="lg" mb="3">
            {tournamentDetail?.name}
          </Heading>
          <HStack spacing="2">
            <Tag size="sm">{tournamentDetail?.type}</Tag>
            <Tag size="sm">{tournamentDetail?.status}</Tag>
            <Tag size="sm">{tournamentDetail?.pool}</Tag>
          </HStack>
        </Flex>
      </Flex>
      <Text mt="4">{tournamentDetail?.description}</Text>
    </>
  );
}

export default TournamentDetailHeader;
