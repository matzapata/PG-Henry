// import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
interface New {
  title: string;
  link: string;
  description: string;
  image_url: string;
}

function Carousel() {
  const [news, setNews] = useState<New[]>([]);
  const [selectedNew, setSelectedNew] = useState(news[0]);

  useEffect(() => {
    axios
      .get("https://pg-henry-prode.netlify.app/data.json")
      .then((response) => {
        setNews(response.data.news);
        setSelectedNew(response.data.news[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setNews]);

  return (
    <Flex
      height="100%"
      bgImg={selectedNew?.image_url}
      bgSize="cover"
      bgPos="center"
      borderRadius={20}
      alignItems="end"
    >
      {/* <VStack
        bgImg={selectedNew?.image_url}
        bgSize="cover"
        bgPos="center"
        justifyContent="flex-end"
        borderRadius={20}
      > */}
      <Heading
        fontSize="xl"
        bgColor="cyan.50"
        opacity="80%"
        borderRadius={20}
        p={2}
      >
        {selectedNew?.title}
        <Text fontSize="large" mt={2}>
          {selectedNew?.description}
        </Text>
      </Heading>
      {/* </VStack> */}
      {/* <VStack>
        {news.map((e, id) => (
          <VStack
            key={id}
            onClick={() => setSelectedNew(e)}
            bgImg={e.image_url}
            bgSize="cover"
            bgPos="center"
            justifyContent="flex-end"
            borderRadius={20}
          >
            <Heading fontSize="xs">{e.title}</Heading>
            <Text fontSize="xx-small">{e.description}</Text>
          </VStack>
        ))}
      </VStack> */}
    </Flex>
  );
}

export default Carousel;
