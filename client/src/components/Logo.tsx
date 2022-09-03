import React from "react";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Logo({ ...props }) {
  return (
    <Link to="/">
      <Image src="/img/logo.png" {...props} w="10" h="10" borderRadius={20} />
    </Link>
  );
}

export default Logo;
