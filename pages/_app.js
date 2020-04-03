import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import "../public/defaults.css";
import "../public/nprogress.css";
import client from "../lib/client";
import { lightTheme, darkTheme } from "../lib/themes";

function MyApp({ Component, pageProps }) {    
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={lightTheme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;
