import "@/styles/globals.css";
import Authorization from "@/config/authorization";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/config/theme"; // Adjust the path as needed
import { Provider } from "react-redux";
import { store } from "@/redux-toolkit/index";

export default function App({ Component, pageProps }) {
  return (
    <Authorization>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </Authorization>
  );
}
