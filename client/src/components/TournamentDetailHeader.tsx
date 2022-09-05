import React, { useEffect } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
import { Link as ReactLink } from "react-router-dom";
import TournamentPrizeCard from "./TournamentPrizeCard";
import Mercadopago from "./Mercadopago";

function TournamentDetailHeader({
  id,
  isOwner,
}: {
  id: string;
  isOwner: boolean;
}) {
  const dispatch = useAppDispatch();
  const tournamentDetail = useAppSelector(
    (state) => state.tournaments.tournamentDetail
  );
  const loading = useAppSelector((state) => state.tournaments.loading);
  const error = useAppSelector((state) => state.tournaments.error);
  const unido = useAppSelector(
    (state) => state.user.userTournaments.is_attached
  );
  useEffect(() => {
    dispatch(fetchTournamentDetail(id));
  }, [id]);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <>
      <Flex justifyContent={"space-between"}>
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
              <Flex alignItems="center" mb="3">
                <Heading size="lg" color="text">
                  {tournamentDetail?.name}
                </Heading>
                {tournamentDetail?.is_official && (
                  <CheckCircleIcon h="5" w="5" ml="2" color="text" />
                )}
              </Flex>
              <HStack spacing="2">
                {tournamentDetail?.status === "INPROGRESS" && (
                  <Tag size="sm">En progreso</Tag>
                )}
                {tournamentDetail?.status === "CONCLUDED" && (
                  <Tag size="sm">Finalizado</Tag>
                )}
                {tournamentDetail?.status === "INCOMING" && (
                  <Tag size="sm">Proximamente</Tag>
                )}

                {tournamentDetail?.type === "PRIVATE" && (
                  <Tag size="sm">Privado</Tag>
                )}
                {tournamentDetail?.type === "PUBLIC" && (
                  <Tag size="sm">Publico</Tag>
                )}

                <Tag size="sm">{tournamentDetail?.pool}</Tag>
              </HStack>
            </Flex>
          </Skeleton>
        </Flex>
        {unido && (
          <Button
            as={ReactLink}
            to={`/torneos/${id}/predicciones`}
            bgColor="buttons"
            color="text"
            _hover={{
              bg: "secondary",
              color: "primary",
            }}
            size="md"
          >
            Prode
          </Button>
        )}
        {!unido && !isOwner && <Mercadopago id={id} />}
      </Flex>
      <Skeleton isLoaded={!loading}>
        <Text my="4" color="text">
          {tournamentDetail?.description}
        </Text>
      </Skeleton>
      <Box mb="4">
        <TournamentPrizeCard poolSize={tournamentDetail?.pool} />
      </Box>
    </>
  );
}

export default TournamentDetailHeader;
