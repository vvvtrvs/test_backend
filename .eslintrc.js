module.exports = {
    root: true,

    env: {
        node: true,
    },

    parserOptions: {
        parser: "@typescript-eslint/parser",
    },

    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        indent: ["error", 4],
        "prettier/prettier": ["error", { tabWidth: 4 }],
    },

    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/prettier",
        "@vue/typescript",
    ],
};
