import fetch from "node-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
    uri:
        process.env.NODE_ENV === "development"
            ? "http://localhost:4444"
            : "https://hacklahoma-wiki-yoga.herokuapp.com",
    credentials: "include",
    fetch,
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
});

export default client;