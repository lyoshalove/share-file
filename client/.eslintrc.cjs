module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-strongly-recommended",
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["error", 2],
    "comma-spacing": ["error", { before: false, after: true }],
    "vue/singleline-html-element-content-newline": [
      "warn",
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea", "input"],
        multiline: "never",
      },
    ],
  },
};
