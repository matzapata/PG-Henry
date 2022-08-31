import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Spacer,
} from "@chakra-ui/react";
import React from "react";

function Widget() {
  return (
    <Stat height={"full"} boxShadow={"md"} borderRadius={10} p={5}>
      <StatLabel fontSize={"2xl"} color={"GrayText"}>
        Usuarios
      </StatLabel>
      <StatNumber fontSize={"3xl"}>6,548</StatNumber>
      <StatHelpText fontSize={"md"}>
        <StatArrow type="increase" />
        23.36%
      </StatHelpText>
    </Stat>
  );
}

export default Widget;
