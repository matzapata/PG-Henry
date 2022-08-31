import {
  ButtonSpinner,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  Heading,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React from "react";

function Featured() {
  return (
    <Flex
      flex={1}
      flexDir={"column"}
      height={"full"}
      alignSelf={"center"}
      boxShadow={"md"}
      borderRadius={10}
      p={5}
      mr={5}
    >
      <Flex>
        <Heading fontSize={"2xl"} fontWeight={"medium"} color={"buttons"}>
          Cuenta
        </Heading>
      </Flex>
      <Flex justifyContent={"center"}>
        <Flex>
          <CircularProgress value={40} size={"250px"} color={"buttons"}>
            <CircularProgressLabel color={"GrayText"}>
              40%
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} alignItems={"center"}>
        <Text fontFamily={"heading"} color={"GrayText"}>
          Total Torneos hoy
        </Text>
        <Text fontSize={"3xl"}>$100,000</Text>
        <Divider />
        <Flex>
          <Stat mt={2} textAlign="center">
            <StatLabel fontSize={"large"} color={"GrayText"}>
              Target
            </StatLabel>
            <Text fontSize={"2xl"}>$80,000</Text>
            <StatHelpText fontSize={"md"}>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Featured;
