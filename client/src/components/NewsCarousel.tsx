import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { ApiNew, New } from "../utils/newsInterfaces";

function Carousel() {
  const [news, setNews] = useState<New[]>([]);
  const [selectedNew, setSelectedNew] = useState(news[0]);

  useEffect(() => {
    axios
      .get(
        `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS_API_KEY}&category=sports&country=ar&language=es`
      )
      .then((response: AxiosResponse) => {
        const dataMap = response.data.results.map((el: ApiNew) => {
          return {
            title: el.title,
            link: el.link,
            description: el.description,
            image: el.image_url,
          };
        });
        setNews(dataMap);
      });
  }, []);

  return (
    <Stack direction="row" height="50%" justifyContent="center">
      <Stack bgImg={selectedNew?.image} bgSize="cover" width="65%">
        <Heading>{selectedNew?.title}</Heading>
        <Text>{selectedNew?.description}</Text>
      </Stack>
      <SimpleGrid columns={3} width="50%">
        {news.map((e) => (
          <Box
            onClick={() => setSelectedNew(e)}
            key={e.image}
            bgImg={e.image}
            height="10%"
          >
            <Heading fontSize="5px">{e.title}</Heading>
            <Text>{e.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default Carousel;
