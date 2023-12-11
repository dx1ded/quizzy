const prettierConfig = require("@quizzy/eslint-config-default/.prettierrc.cjs")

module.exports = {
  root: true,
  extends: ["@quizzy/default", "airbnb/hooks", "plugin:storybook/recommended"],
  plugins: [
    "react-refresh",
    "@conarti/feature-sliced"
  ],
  rules: {
    "prettier/prettier": ["error", {
      ...prettierConfig,
      "plugins": ["prettier-plugin-tailwindcss"]
    }],
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react/no-array-index-key": "off",
    "react/jsx-props-no-spreading": "off",
    "@conarti/feature-sliced/layers-slices": "error",
    "@conarti/feature-sliced/absolute-relative": "error",
    "@conarti/feature-sliced/public-api": "off",
    "react/require-default-props": "off",
    "react/jsx-sort-props": ["error", {
      "callbacksLast": true,
      "shorthandLast": true,
      "reservedFirst": true
    }]
  },
  overrides: [
    {
      files: ["src/**/*stories.{ts,tsx}"],
      rules: {
        "react/function-component-definition": "off",
        "import/no-extraneous-dependencies": "off"
      }
    }
  ]
}
