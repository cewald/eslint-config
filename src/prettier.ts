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
      attributeGroups: [
        '^(:|v-)is$',
        '^v-for$',
        '^v-(if|else-if|else|show|cloak)$',
        '^v-(once|pre|memo)$',
        '^:?id$',
        '^:?key$',
        '^:?ref$',
        '^(v-)?slot$',
        '^#',
        '^v-model$',
        '^v-(?!bind|on|html|text)',
        '^class$',
        '^(v-bind)?:class$',
        '^((v-bind)?:)?(?!data-|v-|:|@|#)',
        '$DEFAULT',
        '^((v-bind)?:)?data-',
        '^v-bind$',
        '^v-on',
        '^@',
        '^v-html$',
        '^v-text$',
      ],
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
