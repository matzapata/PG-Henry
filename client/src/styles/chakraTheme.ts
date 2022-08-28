import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    DPrimary: "#082032", // background & darkmode text
    DSecondary: "#4FBDBA", // buttons bg
    DText: "#F7F7F7", // darkmode text
    warning: "#F95959", // delete account, cancel button
    LPrimary: "#AEFEFF", // ligth mode bg
    LSecondary: "#35858B", // ligth mode buttons bg
  },
});

export default theme;
