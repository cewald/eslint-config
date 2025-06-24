import type { Options } from 'prettier'

const config: Options = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      options: { singleQuote: false },
    },
  ],
}

export default config
