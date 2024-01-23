const prettierConfig = require("./.prettierrc.cjs")

module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true, commonjs: true },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "vite.config.ts",
    "postcss.config.js",
    "tailwind.config.js",
    "prettier.config.js"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: [
    "import",
    "prettier"
  ],
  rules: {
    "prettier/prettier": ["error", prettierConfig],
    "semi": "off",
    "quotes": ["error", "double"],
    "comma-dangle": "off",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "no-else-return": "off",
    "no-debugger": "warn",
    "no-plusplus": "off",
    "no-nested-ternary": "off",
    "no-continue": "off",
    "consistent-return": "off",
    "no-sequences": "off",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent"],
          "index",
          "unknown"
        ]
      }
    ],
    "import/no-extraneous-dependencies": "off",
    "no-return-assign": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/default-param-last": "off",
    "@typescript-eslint/no-throw-literal": "off"
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    }
  }
}
