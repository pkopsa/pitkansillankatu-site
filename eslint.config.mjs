import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// eslint-config-next 15 ei tarjoa flat config -alipolkuja (core-web-vitals, typescript),
// joten ne ladataan FlatCompatin kautta (sama ratkaisu kuin pitkansillankatu18-sitessä).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];
