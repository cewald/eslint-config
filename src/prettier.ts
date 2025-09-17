import merge from 'deepmerge'

const prettier = (props: { tailwindcss?: boolean } & PrettierOptionsReturn = {}): PrettierOptionsReturn => {
  const { tailwindcss = false, ...restProps } = props

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
      plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-organize-attributes'],
      attributeGroups: ['^(id|name)$', '^v-', '^:', '^:aria-', '^aria-', '^:*(class|className|class-name)$'],
      attributeSort: 'ASC',
    },
    restProps,
  )

  if (tailwindcss) {
    config.plugins?.push('prettier-plugin-tailwindcss')
  }

  return config
}

export { prettier }

export default prettier
