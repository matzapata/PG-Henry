import React from "react";
import { Image } from "@chakra-ui/react";

function Logo({ ...props }) {
  return <Image src="/img/logo.png" {...props} />;
}

export default Logo;
