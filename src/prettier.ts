import type { Options } from 'prettier'

const prettier: Options = {
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  quoteProps: 'consistent',
  objectWrap: 'collapse',
  arrowParens: 'avoid',
  singleAttributePerLine: true,
  overrides: [{ files: ['*.yaml', '*.yml'], options: { singleQuote: false } }],
}

export { prettier }

export default prettier
