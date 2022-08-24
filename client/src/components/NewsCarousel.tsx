import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { color, Grid, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiNew, New } from "../utils/newsInterfaces";
import theme from "../utils/chakraTheme";

function Carousel() {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<New[]>([]);
  const [selectecIndex, setSelectedIndex] = useState(0);
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
        console.log(dataMap);
        setNews(dataMap);
        selectNew(selectecIndex, news);
      });
  }, []);

  const selectNew = (index: number, news: New[], next = true) => {
    const condition = next
      ? selectecIndex < news.length - 1
      : selectecIndex > 0;
    const nextIndex = next
      ? condition
        ? selectecIndex + 1
        : 0
      : condition
      ? selectecIndex - 1
      : news.length - 1;
    setSelectedNew(news[nextIndex]);
    setSelectedIndex(nextIndex);
  };
  const previous = () => {
    selectNew(selectecIndex, news, false);
  };
  const next = () => {
    selectNew(selectecIndex, news);
  };

  console.log(news);
  console.log(selectedNew);

  return (
    <Grid templateColumns="repeat(3, 3fr)" gap={2} m="20px" pt="50px">
      <IconButton
        onClick={previous}
        aria-label="previous"
        icon={<ChevronLeftIcon />}
      />
      {/* <Stack
        direction="row"
        bgImage={selectedNew.image} 
        width="80vw"
        height="300px"
      >
        <Link to={selectedNew.link}>
          <Text color="#F7F7F7">{selectedNew.title}</Text>
          <Text color="#F7F7F7">{selectedNew.description}</Text>
        </Link> 
      </Stack> */}
      <IconButton
        onClick={next}
        aria-label="next"
        icon={<ChevronRightIcon />}
      />
    </Grid>
  );
}

export default Carousel;
