import type { Options } from 'prettier'

const prettier: Options = {
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      options: { singleQuote: false },
    },
  ],
}

export { prettier }

export default prettier
