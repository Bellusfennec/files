module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: "standard",
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "quote-props": "off",
    "quotes": "off",
    "semi": [2, "always"],
    "space-before-function-paren": "off"
  }
};
