const makeUnique = require("./makeUnique");
const { Slug, Text } = require("@keystonejs/fields");

const User = {
    fields: {
        name: { type: Text },
        url: {
            type: Slug,
            from: "name",
            makeUnique: ({ slug, previousSlug }) => makeUnique(slug, previousSlug),
        },
    },
};

module.exports = User;
