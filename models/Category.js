const makeUnique = require("./makeUnique");
const { Slug, Text, Relationship, Integer } = require("@keystonejs/fields");

const Category = {
    fields: {
        name: { type: Text },
        url: {
            type: Slug,
            from: "name",
            makeUnique: ({ slug, previousSlug }) => makeUnique(slug, previousSlug),
        },
        emoji: { type: Text },
        pages: { type: Relationship, ref: "Page.category", many: true },
        index: { type: Integer, defaultValue: 0 },
    },
};

module.exports = Category;
