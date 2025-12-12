import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  // kompi-overrides
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // IMPORTANT: disable this to avoid duplicate warnings
      "@typescript-eslint/no-unused-vars": "off",

      // remove unused imports (auto-fixable)
      "unused-imports/no-unused-imports": "warn",

      // unused vars (ignore anything starting with _ , incl catch params)
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // optional: keep or remove (your choice)
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "off",
    },
  },

  // kompi-tools-img-override
  {
    files: ["src/app/tools/**/*.{ts,tsx}", "src/components/tools/**/*.{ts,tsx}"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
