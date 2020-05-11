const makeUnique = require("./makeUnique");
const { Slug, Text, Select, Relationship, Integer } = require("@keystonejs/fields");

const Page = {
    fields: {
        name: { type: Text },
        url: {
            type: Slug,
            from: "name",
            makeUnique: ({ slug, previousSlug }) => makeUnique(slug, previousSlug),
        },
        status: {
            type: Select,
            options: "INCOMPLETE, TRANSITION, COMPLETE",
            defaultValue: "INCOMPLETE",
        },
        category: {
            type: Relationship,
            ref: "Category.pages",
        },
        createdBy: {
            type: Relationship,
            ref: "User",
        },
        modifiedBy: {
            type: Relationship,
            ref: "User",
        },
        content: { type: Text },
        index: { type: Integer, defaultValue: 0 },
    },
};

module.exports = Page;
