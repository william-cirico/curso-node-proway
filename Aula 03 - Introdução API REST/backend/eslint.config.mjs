import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  pluginJs.configs.recommended, // Extende as regras recomendadas do ESLint JS
  ...tseslint.configs.recommended, // Extende as regras recomendadas do TypeScript ESLint
  ...tseslint.configs.strict, // Extende as regras mais estritas do TypeScript ESLint
  ...tseslint.configs.stylistic, // Extende regras de estilo do TypeScript ESLint
  eslintConfigPrettier,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser, // Definindo os globals do navegador
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error" ]}], // Avisar sobre o uso de console.log
      semi: ["error", "always"], // Exigir ponto e vírgula
      quotes: ["error", "double"], // Exigir aspas duplas
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" }, // Ignorar variáveis iniciadas com _
      ],
    },
  },
];
