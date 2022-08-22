import React from "react";
import { Image } from "@chakra-ui/react";

function Logo({ ...props }) {
  return (
    <Image src="/img/logo.png" {...props} w="10" h="10" borderRadius={20} />
  );
}

export default Logo;
