const general = {
    blue: "#007FFF",
    gray: "rgb(129, 134, 145)",
    lightGray: "#F1F1F0",
    red: "#CC2936",
    green: "#36de2a",
    yellow: "#ffe063",
    mobileWidth: "480px",
    fadedBackground: "rgba(0, 0, 0, .1)",
};

const themes = {
    light: {
        ...general,
        type: "light",
    },
    dark: {
        ...general,
        type: "dark",
    },
};

export { themes };
