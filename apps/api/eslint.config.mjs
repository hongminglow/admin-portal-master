import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  // Base JavaScript recommendations
  js.configs.recommended,

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
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",

        // Jest globals for testing
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
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
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // Keep only essential error catching but allow TypeScript patterns
      "no-console": "off", // Allow console.log in backend
      "no-debugger": "warn",
      "no-unreachable": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": "off", // Allow empty blocks
      "no-redeclare": "off", // TypeScript handles function overloads better
      "no-constant-condition": "off", // Allow while(true) loops
    },
  },

  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      "coverage/**",
      "out/**",
      "__data/**",
      "logs/**",
      ".vscode/**",
      ".github/**",
      "deploy/**",
      "**/*.d.ts",
    ],
  },
];
