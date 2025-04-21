/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    plugins: ["prettier-plugin-tailwindcss"],
    tailwindStylesheet: "./app/globals.css",
    tailwindConfig: "./tailwind.config.ts",
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    singleQuote: true,
  };