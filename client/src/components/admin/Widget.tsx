import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Flex,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { Stats } from "../../redux/slices/admin";

interface WidgetProps {
  stats: Stats;
}

export function percentage(a: number, b: number) {
  return (a * 100) / b;
}

function Widget({ stats }: WidgetProps) {
  const publicos = Math.floor(
    percentage(stats.publicTournaments, stats.tournaments)
  );
  const privados = Math.floor(
    percentage(stats.privateTournaments, stats.tournaments)
  );
  const activos = Math.floor(percentage(stats.activeUsers, stats.users));
  const inactivos = Math.floor(percentage(stats.inactiveUsers, stats.users));
  const banneados = Math.floor(percentage(stats.banned, stats.users));

  return (
    <HStack spacing={5} width={"full"}>
      <Stat
        height={"full"}
        boxShadow={"md"}
        borderRadius={10}
        p={5}
        textAlign={"center"}
      >
        <StatLabel fontSize={"2xl"} color={"GrayText"}>
          Torneos
        </StatLabel>
        <StatNumber fontSize={"3xl"}>{stats.tournaments}</StatNumber>
        <StatHelpText fontSize={"md"}>
          {publicos >= 50 ? (
            <StatArrow type="increase" />
          ) : (
            <StatArrow type="decrease" />
          )}
          {`Publicos: ${publicos}%`}
        </StatHelpText>
        <StatHelpText fontSize={"md"}>
          {privados >= 50 ? (
            <StatArrow type="increase" />
          ) : (
            <StatArrow type="decrease" />
          )}
          {`Privados: ${privados}%`}
        </StatHelpText>
      </Stat>
      <Stat
        height={"full"}
        boxShadow={"md"}
        borderRadius={10}
        p={5}
        textAlign={"center"}
      >
        <StatLabel fontSize={"2xl"} color={"GrayText"}>
          Usuarios
        </StatLabel>
        <StatNumber fontSize={"3xl"}>{stats.users}</StatNumber>
        <StatHelpText fontSize={"md"}>
          {activos >= 50 ? (
            <StatArrow type="increase" />
          ) : (
            <StatArrow type="decrease" />
          )}
          {`Activos: ${activos}%`}
        </StatHelpText>
        <StatHelpText fontSize={"md"}>
          {inactivos >= 50 ? (
            <StatArrow type="increase" />
          ) : (
            <StatArrow type="decrease" />
          )}
          {`Inactivos: ${inactivos}%`}
        </StatHelpText>
      </Stat>
      <Stat
        height={"full"}
        boxShadow={"md"}
        borderRadius={10}
        p={5}
        textAlign={"center"}
      >
        <StatLabel fontSize={"2xl"} color={"GrayText"}>
          Banneados
        </StatLabel>
        <StatNumber fontSize={"3xl"}>{stats.banned}</StatNumber>
        <StatHelpText fontSize={"md"}>
          {banneados >= 50 ? (
            <StatArrow type="increase" />
          ) : (
            <StatArrow type="decrease" />
          )}
          {`${banneados}%`}
        </StatHelpText>
      </Stat>
    </HStack>
  );
}

export default Widget;
