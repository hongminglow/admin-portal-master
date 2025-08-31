import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";

export default [
  // Base JavaScript recommendations
  js.configs.recommended,

  // Vue essential rules only
  ...vue.configs["flat/essential"],

  {
    files: ["**/*.{js,ts,mjs,cjs}"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Node.js globals
        global: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",

        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",
        location: "readonly",
        navigator: "readonly",

        // Build/Vite globals
        import: "readonly",
        ImportMetaEnv: "readonly",
        ImportMeta: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      // Disable annoying rules
      "no-unused-vars": "off",
      "no-undef": "off", // TypeScript handles this better
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",

      // Keep only essential error catching
      "no-console": "off",
      "no-debugger": "warn",
      "no-unreachable": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": "off", // Allow empty blocks
      "no-redeclare": "error",
    },
  },

  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        // Vue globals
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",

        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",
        location: "readonly",
        navigator: "readonly",

        // Build/Vite globals
        import: "readonly",
        ImportMetaEnv: "readonly",
        ImportMeta: "readonly",
      },
    },
    plugins: {
      vue,
      "@typescript-eslint": typescript,
    },
    rules: {
      // Disable Vue style rules
      "vue/multi-word-component-names": "off",
      "vue/no-unused-components": "off",
      "vue/no-unused-vars": "off",
      "vue/require-default-prop": "off",
      "vue/require-prop-types": "off",
      "vue/no-v-html": "off",

      // Keep only essential Vue error catching
      "vue/no-dupe-keys": "error",
      "vue/no-duplicate-attributes": "error",
      "vue/no-parsing-error": "error",
      "vue/no-reserved-keys": "error",

      // Disable TypeScript rules in Vue files
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },

  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      "public/**",
      "**/*.d.ts",
      "coverage/**",
      ".nuxt/**",
      ".output/**",
      ".vite/**",
    ],
  },
];
