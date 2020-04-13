/**
 * This overwrites Next.js's default app to include providers and whatnot.
 * 
 * TODO: 
 *  - A way to change themes has not yet been implemented. 
 */

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import "../public/defaults.css";
import "../public/nprogress.css";
import client from "../lib/client";
import Head from "next/head";
import { themes } from "../lib/themes.js";
import "react-quill/dist/quill.snow.css";

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={themes.light}>
                <Head>
                    <title>Wiki</title>
                </Head>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;
