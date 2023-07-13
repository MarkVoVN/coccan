import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ea5857",
    },
    secondary: {
      main: "#FECC64",
    },
    error: {
      main: "#D32F2F",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    h1: {
      fontSize: "96px",
    },
    h2: {
      fontSize: "64px",
    },
    h3: {
      fontSize: "48px",
    },
    h4: {
      fontSize: "32px",
    },
    h5: {
      fontSize: "24px",
    },
    h6: {
      fontSize: "20px",
    },
    subtitle1: {
      fontSize: "16px",
    },
    subtitle2: {
      fontSize: "14px",
    },
    body1: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "14px",
    },
    caption: {
      fontSize: "12px",
    },
    overline: {
      fontSize: "12px",
    },
  },
});

export default theme;
