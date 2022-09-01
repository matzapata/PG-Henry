import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { Rating, RatingView } from "react-simple-star-rating";

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={6}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
      width="250px"
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name }: { src: string; name: string }) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles(props: any) {
  return (
    // <Box bg={useColorModeValue("gray.100", "gray.700")}>
    <Box bg={"rgba(57,91,100,0)"}>
      <Container maxW={"4xl"} py={8} as={Stack} spacing={12}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
          display="flex"
          justifyContent={"center"}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>{props.titulo}</TestimonialHeading>
              <TestimonialText>{props.review}</TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar src={props.avatar} name={props.name} />
            <Flex justifyContent={"center"}>
              <RatingView ratingValue={props.stars} />
            </Flex>
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
