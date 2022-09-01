import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { JsxElement } from "typescript";
import { FaUsers, FaTrophy } from "react-icons/fa";
import {
  MdSpaceDashboard,
  MdSportsSoccer,
  MdLogout,
  MdOutlineWarning,
} from "react-icons/md";
import { Link as ReactLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { signOut } from "../../redux/slices/authThunk";
import BanForm from "./BanForm";
import AdminFormulary from "./AdminForm";

function SideBar() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.auth.decoded);

  return (
    <VStack flex={1} backgroundColor={"primary"}>
      <Box p="5px">
        <Heading fontSize={"2xl"} fontWeight={"medium"} color={"buttons"} p={5}>
          Prode Master
        </Heading>
      </Box>
      <Divider />
      <VStack spacing={10} alignItems={"baseline"}>
        <Flex alignItems={"center"} mt={10}>
          <Icon as={MdSpaceDashboard} color={"buttons"} />
          <Link as={ReactLink} to={"/admin"} ml={2} color="text">
            Dashboard
          </Link>
        </Flex>
        <Flex alignItems={"center"}>
          <Icon as={FaUsers} color={"buttons"} />
          <Link as={ReactLink} to={"/admin/usuarios"} ml={2} color="text">
            Usuarios
          </Link>
        </Flex>
        <Flex alignItems={"center"}>
          <Icon as={FaTrophy} color={"buttons"} />
          <Link as={ReactLink} to={"/admin/torneos"} ml={2} color="text">
            Torneos
          </Link>
        </Flex>
        <Flex alignItems={"center"}>
          <Icon as={MdSportsSoccer} color={"buttons"} />
          <Link as={ReactLink} to={"/admin/partidos"} ml={2} color="text">
            Partidos
          </Link>
        </Flex>
        <Flex alignItems={"center"}>
          <Icon as={MdOutlineWarning} color={"buttons"} />
          <AdminFormulary />
        </Flex>
        <Flex alignItems={"center"}>
          <Icon as={MdOutlineWarning} color={"buttons"} />
          <BanForm email={data?.email} />
        </Flex>
        <Flex alignItems={"center"}>
          <Icon as={MdLogout} color={"buttons"} />
          <Link
            as={ReactLink}
            to={"/auth/login"}
            onClick={() => dispatch(signOut)}
            ml={2}
            color="text"
          >
            Cerrar Sesion
          </Link>
        </Flex>
      </VStack>
    </VStack>
  );
}

export default SideBar;
