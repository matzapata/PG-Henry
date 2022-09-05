import React, { useEffect } from "react";
import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";

function PaymentSuccess() {
  const { id } = useParams<{ id: string }>();

  return (
    <Flex
      h={"100vh"}
      w={"100%"}
      bgColor={"primary"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Flex
        flexDir={"column"}
        width={"50%"}
        height={"50%"}
        bgColor={"green.500"}
        borderRadius={5}
        textAlign={"center"}
        boxShadow={"dark-lg"}
      >
        <Heading color={"text"} my={10}>
          Te has unido correctamente!
        </Heading>
        <CheckCircleIcon w={200} h={200} color={"text"} alignSelf={"center"} />
        <Link to={`/torneos/${id}`}>
          <Button
            my={10}
            bgColor={"green.700"}
            color="text"
            _hover={{
              bg: "green.600",
            }}
            size="lg"
          >
            Ir a tu torneo!
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}

export default PaymentSuccess;
