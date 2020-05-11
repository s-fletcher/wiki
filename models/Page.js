const makeUnique = require("./makeUnique");
const { Slug, Text, Select, Relationship } = require("@keystonejs/fields");
const { AuthedRelationship } = require("@keystonejs/fields-authed-relationship");

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
        category: { type: Relationship, ref: "Category.pages" },
        createdBy: {
            type: AuthedRelationship,
            ref: "User",
        },
        modifiedBy: {
            type: AuthedRelationship,
            ref: "User",
        },
        content: { type: Text },
    },
};

module.exports = Page;
