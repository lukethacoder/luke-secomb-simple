// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: true,
  jsxBracketSameLine: false,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
