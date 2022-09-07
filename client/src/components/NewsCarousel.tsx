import React, { useEffect, useState } from "react";
import { Box, Heading, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import axios from "axios";

interface New {
  title: string;
  link: string;
  description: string;
  image_url: string;
}

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function NewsCarousel(props: any) {
  const [news, setNews] = useState<New[]>([]);
  const [slider, setSlider] = useState<Slider | null>(null);

  useEffect(() => {
    axios
      .get("https://pg-henry-prode.netlify.app/data.json")
      .then((response) => {
        setNews(response.data.news);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setNews]);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  return (
    <Box
      position={"relative"}
      minH={"450px"}
      h="full"
      w="full"
      overflow={"hidden"}
      bg={"rgba(57,91,100,0.7)"}
      borderRadius="15px"
    >
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {news.map((n, i) => (
          <Box
            key={i}
            w={"100%"}
            bgImg={n.image_url}
            bgSize={"cover"}
            height={"50vh"}
            bgColor={"red.300"}
            textAlign={"center"}
          >
            <Heading color={"text"} fontSize={"2xl"}>
              {n.title}
            </Heading>
            <Heading color={"text"} fontSize={"sm"}>
              {n.description}
            </Heading>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
