import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import Review from "./Review";

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

export default function Carousel(props: any) {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  return (
    <Box
      position={"relative"}
      height={"500px"}
      width={"100%"}
      overflow={"hidden"}
      //   bg={useColorModeValue("gray.100", "gray.700")}
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
        <Box>
          <Review
            title1={"Pagos Rapidos"}
            title2={"Seguro para apostar"}
            title3={"Muy buen soporte"}
            review1={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem."
            }
            review2={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem."
            }
            review3={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem."
            }
            name1={"Mati"}
            name2={"Santi"}
            name3={"San"}
            cargo1={"Fullstack Dev"}
            cargo2={"Fullstack Dev"}
            cargo3={"Fullstack Dev"}
          />
        </Box>
        <Box>
          <Review
            title1={"Buen contenido"}
            title2={"Muy buen diseño"}
            title3={"Funciona perfecto"}
            review1={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem."
            }
            review2={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem."
            }
            review3={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem."
            }
            name1={"Meli"}
            name2={"Ale"}
            name3={"Nico"}
            cargo1={"Fullstack Dev"}
            cargo2={"Fullstack Dev"}
            cargo3={"Fullstack Dev"}
          />
        </Box>
      </Slider>
    </Box>
  );
}
