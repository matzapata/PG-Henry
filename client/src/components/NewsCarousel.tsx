// import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
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
    <Stack direction="row" height="50%" justifyContent="center" mt={10}>
      <Stack bgImg={selectedNew?.image_url} bgSize="cover" width="65%">
        <Heading>{selectedNew?.title}</Heading>
        <Text>{selectedNew?.description}</Text>
      </Stack>
      <SimpleGrid columns={3} width="50%">
        {news.map((e, id) => (
          <Box
            key={id}
            onClick={() => setSelectedNew(e)}
            bgImg={e.image_url}
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
