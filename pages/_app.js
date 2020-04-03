import App from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import "../public/defaults.css";
import "../public/nprogress.css";
import client from "../lib/client";
import { lightTheme, darkTheme } from "../lib/themes";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
    if (Component.name === "Index") {
        var navProps = { search: true, filter: true, add: true, settings: true };
    }
    console.log("DEBUG ------");
    console.log(Component);
    console.log(Component.name);
    console.log(pageProps);
    console.log("DEBUG ------");
    
    
    
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={lightTheme}>
                <NavBar search filter add settings />
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;
