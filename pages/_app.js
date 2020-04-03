import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import "../public/defaults.css";
import "../public/nprogress.css";
import client from "../lib/client";
import { lightTheme, darkTheme } from "../lib/themes";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={lightTheme}>
                <Head>
                    <title>Wiki</title>
                </Head>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;
