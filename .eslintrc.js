module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    parser: "babel-eslint",
  },
  extends: ["plugin:prettier/recommended", "prettier"],
  plugins: ["prettier"],
  // add your custom rules here
  rules: {
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": "off",
    eqeqeq: "off",
    yoda: "off",
    camelcase: "off",
    "max-len": "off",
    "vue/no-v-html": "off",
  },
};
