import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#082032", // background & darkmode text
    buttons: "#4FBDBA", // buttons bg
    secondary: "#395B64",
    text: "#F7F7F7", // darkmode text
    warning: "#F95959", // delete account, cancel button
    Lprimary: "#AEFEFF", // ligth mode bg
    Lsecondary: "#35858B", // ligth mode buttons bg
  },
});

export default theme;
