const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { KnexAdapter: Adapter } = require("@keystonejs/adapter-knex");
const { NextApp } = require("@keystonejs/app-next");
const { Text } = require("@keystonejs/fields");
require("dotenv").config();

const PROJECT_NAME = "wiki";
const adapterConfig = {
    dropDatabase: true,
    knexOptions: {
        connection: process.env.DATABASE_URL,
    },
    onConnect: async (keystone) => {
        // Check the users list to see if there are any; if we find none, assume
        // it's a new database and initialise the demo data set.
        const users = await keystone.lists.User.adapter.findAll();
        if (!users.length && process.env.NODE_ENV !== "production") {
            console.log(`💾 Creating initial data...`);
            await keystone.createItems({});
        }
    },
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
        "dist",
    ],
};
