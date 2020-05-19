const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { KnexAdapter: Adapter } = require("@keystonejs/adapter-knex");
const { NextApp } = require("@keystonejs/app-next");
const { User, Page, Category } = require("./models");
const { addPage } = require("./resolvers");
const dotenv = require("dotenv");

dotenv.config();

const PROJECT_NAME = "wiki";

// Setting up knex adapter for postgres database
const adapterConfig = {
    dropDatabase: true,
    knexOptions: {
        connection: process.env.DATABASE_URL,
    },
};

// Creating keystone instance
const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new Adapter(adapterConfig),
});

// Creating lists
keystone.createList("User", User);
keystone.createList("Page", Page);
keystone.createList("Category", Category);

// Adding custom schemas/resolvers
keystone.extendGraphQLSchema({
    mutations: [
        {
            schema: "addPage(name: String!, categoryId: ID): Page",
            resolver: addPage,
        },
    ],
});

// Exporting
module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({ enableDefaultRoute: false }),
        new NextApp({ dir: "src" }),
        "dist",
    ],
};
