import merge from 'deepmerge'

const prettier = (props: { tailwindcss?: boolean } & PrettierOptionsReturn = {}): PrettierOptionsReturn => {
  const { tailwindcss = false } = props

  const config: PrettierOptionsReturn = merge(
    {
      trailingComma: 'all',
      tabWidth: 2,
      printWidth: 120,
      semi: false,
      singleQuote: true,
      quoteProps: 'consistent',
      arrowParens: 'avoid',
      singleAttributePerLine: true,
      overrides: [{ files: ['*.yaml', '*.yml'], options: { singleQuote: false } }],
      plugins: [],
    },
    props,
  )

  if (tailwindcss) {
    config.plugins?.push('prettier-plugin-tailwindcss')
  }

  return config
}

export { prettier }

export default prettier
