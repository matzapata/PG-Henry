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
import { Stats } from "../../redux/slices/admin";
import { percentage } from "./Widget";

interface FeaturedProps {
  stats: Stats;
}

function Featured({ stats }: FeaturedProps) {
  const revenuePercentage = Math.floor(percentage(stats.revenue, 1500000));

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
          Ingresos
        </Heading>
      </Flex>
      <Flex justifyContent={"center"}>
        <Flex>
          <CircularProgress
            value={revenuePercentage}
            size={"250px"}
            color={"buttons"}
          >
            <CircularProgressLabel color={"GrayText"}>
              {`${revenuePercentage}%`}
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} alignItems={"center"}>
        <Text fontFamily={"heading"} color={"GrayText"}>
          Total Torneos
        </Text>
        <Text fontSize={"3xl"}>{`$ ${stats.revenue}`}</Text>
        <Divider />
        <Flex>
          <Stat mt={2} textAlign="center">
            <StatLabel fontSize={"large"} color={"GrayText"}>
              Target
            </StatLabel>
            <Text fontSize={"2xl"}>$1500000</Text>
            <StatHelpText fontSize={"md"}>
              {revenuePercentage >= 50 ? (
                <StatArrow type="increase" />
              ) : (
                <StatArrow type="decrease" />
              )}
              {`${revenuePercentage}%`}
            </StatHelpText>
          </Stat>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Featured;
