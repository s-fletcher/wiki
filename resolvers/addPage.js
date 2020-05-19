/**
 * Adds a new page and creates Miscellaneous category if it doesn't exist.
 */

const addPage = async (_, { name, categoryId }) => {
    const { keystone } = require("../index.js");

    var id;
    // If mutation calls for specific category
    if (categoryId) {
        id = categoryId;
        // No specific category, adding to Miscellaneous category...
    } else {
        // Checking if Miscellaneous category exists
        const categories = await keystone.executeQuery(`
            query {
                allCategories(where:{url:"miscellaneous"}) {
                    id
                }
            }
        `);
        // If miscellaneous category already exists...
        if (categories.data.allCategories.length > 0) {
            id = categories.data.allCategories[0].id;
        }
        // Miscellaneous category does not exist, create one
        else {
            const misc = await keystone.executeQuery(`
                mutation {
                    createCategory(data: {
                        name: "Miscellaneous", 
                        index: 100000,
                    }) {
                        id
                    }
                }
            `);
            id = misc.data.createCategory.id;
        }
    }
    // Create page
    const result = await keystone.executeQuery(`
        mutation {
            createPage(data: {
                name: "${name}", 
                category: {
                    connect: {
                        id: "${id}"
                    }
                }
            }) {
                url
            }
        }
    `);
    return result.data.createPage;
};

module.exports = addPage;
