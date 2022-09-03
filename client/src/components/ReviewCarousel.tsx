import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import Review from "./Review";
import { useAppSelector } from "../redux/hooks";
import api from "../services/api";

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
  const data1 = useAppSelector((state) => state.user.userComments);

  const denunciar = async (email: string, comentario: string) => {
    try {
      const response = await api.post("/feedback/denunciar", {
        email,
        comentario,
      });
      console.log(response.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  return (
    <Box
      position={"absolute"}
      height={"400px"}
      width={"35%"}
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
        {data1.map((review, index) => (
          <Box key={index}>
            <Review
              stars={review.stars}
              review={review.comentario}
              name={review.username}
              avatar={review.avatar}
              titulo={review.titulo}
            />
            <Flex justifyContent={"center"}>
              <Button
                key={index}
                colorScheme={"red"}
                onClick={(e) => {
                  denunciar(review.email, review.comentario);
                  alert("Has denunciado correctamente el comentario !");
                }}
              >
                Denunciar
              </Button>
            </Flex>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
