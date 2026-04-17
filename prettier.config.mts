import { type Config as PrettierConfig } from 'prettier';
import { type PluginOptions as TailwindConfig } from 'prettier-plugin-tailwindcss';

const config: PrettierConfig & TailwindConfig = {
  arrowParens: 'always',
  singleQuote: true,
  jsxSingleQuote: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'es5',
  semi: true,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
