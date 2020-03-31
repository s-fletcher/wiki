module.exports = {
    exportPathMap: async function() {
        // pages we know about beforehand
        const paths = {
            "/": { page: "/" },
            "/login": { page: "/login" },
            "/demo-page-two": { page: "/demo-page-two" },
        };
    },
};
