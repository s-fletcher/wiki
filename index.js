const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { KnexAdapter: Adapter } = require("@keystonejs/adapter-knex");
const { NextApp } = require("@keystonejs/app-next");
const {User, Page, Category } = require("./lists");
const dotenv = require("dotenv");

dotenv.config();

const PROJECT_NAME = "wiki";
const adapterConfig = {
    dropDatabase: true,
    knexOptions: {
        connection: process.env.DATABASE_URL,
    },
};

const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new Adapter(adapterConfig),
});

keystone.createList("User", User);
keystone.createList("Page", Page);
keystone.createList("Category", Category);

module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({ enableDefaultRoute: false }),
        new NextApp({ dir: "src" }),
        "dist",
    ],
};
