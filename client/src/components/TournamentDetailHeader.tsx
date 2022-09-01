import React, { useEffect } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  Tag,
  Text,
} from "@chakra-ui/react";
import { fetchTournamentDetail } from "../redux/slices/tournamentThunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import TournamentPrizeCard from "./TournamentPrizeCard";

function TournamentDetailHeader({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const tournamentDetail = useAppSelector(
    (state) => state.tournaments.tournamentDetail
  );
  const loading = useAppSelector((state) => state.tournaments.loading);
  const error = useAppSelector((state) => state.tournaments.error);
  useEffect(() => {
    dispatch(fetchTournamentDetail(id));
  }, [id]);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <>
      <Flex alignItems="center">
        {loading ? (
          <Skeleton w="14" h="14" />
        ) : (
          <Image
            h="14"
            w="14"
            objectFit="cover"
            border="2px solid white"
            borderRadius="2"
            src={
              tournamentDetail?.logo_url
                ? tournamentDetail?.logo_url
                : "/img/logo.png"
            }
          />
        )}
        <Skeleton isLoaded={!loading} ml="4">
          <Flex direction="column" ml="4">
            <Heading size="lg" mb="3" color="text">
              {tournamentDetail?.name}
              {tournamentDetail?.is_official === true ? (
                <CheckCircleIcon />
              ) : (
                <Text></Text>
              )}
            </Heading>
            <HStack spacing="2">
              <Tag size="sm">{tournamentDetail?.type}</Tag>
              <Tag size="sm">{tournamentDetail?.status}</Tag>
              <Tag size="sm">{tournamentDetail?.pool}</Tag>
            </HStack>
          </Flex>
        </Skeleton>
      </Flex>
      <Skeleton isLoaded={!loading}>
        <Text my="4" color="text">
          {tournamentDetail?.description}
        </Text>
      </Skeleton>
      <TournamentPrizeCard poolSize={tournamentDetail?.pool} />
    </>
  );
}

export default TournamentDetailHeader;
