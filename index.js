const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { KnexAdapter: Adapter } = require("@keystonejs/adapter-knex");
const { NextApp } = require("@keystonejs/app-next");
const { Text } = require("@keystonejs/fields");
require("dotenv").config();

console.log(process.env);

const PROJECT_NAME = "wiki";
const adapterConfig = {
    knexOptions: {
        connection: process.env.POSTGRES_URI,
        // "postgres://localhost/wiki-dev"
    },
    // dropDatabase: true,
};

const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new Adapter(adapterConfig),
});

keystone.createList("User", {
    fields: {
        name: { type: Text },
    },
});

keystone.createList("Page", {
    fields: {
        name: { type: Text },
    },
});

keystone.createList("Category", {
    fields: {
        name: { type: Text },
    },
});

module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({ enableDefaultRoute: false }),
        new NextApp({ dir: "src" }),
        "dist"
    ],
};
