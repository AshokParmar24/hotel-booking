import { createTheme } from "@mui/material/styles";

// Define the colors for both light and dark themes
const staticPrimaryColor = "#7367F0";
const staticPrimaryDarkenColor = "#675DD8";

const commonColors = {
  primary: {
    main: staticPrimaryColor,
    contrastText: "#fff",
  },
  secondary: {
    main: "#808390",
    contrastText: "#fff",
  },
  success: {
    main: "#28C76F",
    contrastText: "#fff",
  },
  info: {
    main: "#00BAD1",
    contrastText: "#fff",
  },
  warning: {
    main: "#FF9F43",
    contrastText: "#fff",
  },
  error: {
    main: "#FF4C51",
    contrastText: "#fff",
  },
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: commonColors.primary,
    secondary: commonColors.secondary,
    success: commonColors.success,
    info: commonColors.info,
    warning: commonColors.warning,
    error: commonColors.error,
    background: {
      default: "#ffff",
      paper: "#fff",
    },
    text: {
      primary: "#2F2B3D",
      secondary: "#808390",
    },
    action: {
      active:"#7367F0",
      hover: "#a9a3e5", // muted purple for hover states
      selected: "#A9A3E5", // light blue for selected items
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {},
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    typography: {
      // Define h1 to h6 styles
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 700,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 700,
        lineHeight: 1.6,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: 1.7,
      },
      // Define subtitle1 and subtitle2 styles
      subtitle1: {
        fontSize: "1.25rem",
        fontWeight: 400,
        lineHeight: 1.6,
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.7,
      },
      // Define body1 and body2 styles
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.4,
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: commonColors.primary,
    secondary: commonColors.secondary,
    success: commonColors.success,
    info: commonColors.info,
    warning: commonColors.warning,
    error: commonColors.error,
    background: {
      default: "#25293C",
      paper: "#2F3349",
    },
    text: {
      primary: "#E1DEF5",
      secondary: "#B6BEE3",
    },
    action: {
      hover: "#3F51B5", // muted indigo for hover state
      selected: "#5C6BC0", // indigo for selected items 
    },
    grey: {
      50: "#26293A",
      100: "#2F3349",
      200: "#26293A",
      300: "#4A5072",
      400: "#5E6692",
      500: "#7983BB",
      600: "#AAB3DE",
      700: "#B6BEE3",
      800: "#CFD3EC",
      900: "#E7E9F6",
    },
  },
  components: {
    // You can customize components here
  },
});

export { lightTheme, darkTheme };
