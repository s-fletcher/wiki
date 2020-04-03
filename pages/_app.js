import fetch from "node-fetch";
import App, { Container } from "next/app";
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import "../public/defaults.css";
import "../public/nprogress.css";
import { ThemeProvider } from 'styled-components'

// const tokenValue =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJ3aWtpQGRldiIsInJvbGVzIjpbImFkbWluIl19LCJpYXQiOjE1ODU1MzQzMTksImV4cCI6MTU4NjEzOTExOX0.DzfNUwNW37ahzn_X6oSXItfXhh6TPyH9svNF30AZltU";

// const authLink = new ApolloLink((operation, forward) => {
//     // add the authorization to the headers
//     operation.setContext({
//         headers: {
//             authorization: tokenValue ? `Bearer ${tokenValue}` : "",
//         },
//     });
//     return forward(operation);
// });

const httpLink = new HttpLink({
    uri:
        process.env.NODE_ENV === "development"
            ? "http://localhost:4444"
            : "***REMOVED***",
    credentials: "include",
    fetch,
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    // link: authLink.concat(httpLink),
    link: httpLink,
});

const lightTheme = {
    blue: "#5F8BC9",
    gray: "#828690",
    lightGray: "#F1F1F0",
    mobileWidth: "480px",
};

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        
        // exposes the query to the user
        pageProps.query = ctx.query;
        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <ApolloProvider client={client}>
                <ThemeProvider theme={lightTheme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}

export default MyApp;
