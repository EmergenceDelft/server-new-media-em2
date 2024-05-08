module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["prettier"],
};
