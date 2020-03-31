module.exports = {
    exportPathMap: async function() {
        // pages we know about beforehand
        return {
            "/": { page: "/" },
            "/login": { page: "/login" },
            "/demo-page-two": { page: "/[page]" },
        };
    },
};
