import stylistic from '@stylistic/eslint-plugin'
import pluginTailwindCSS from 'eslint-plugin-tailwindcss'
import merge from 'deepmerge'

export type ConfigProps = {
  tailwindcss?: boolean
}

const DefaultConfigProps: ConfigProps = {
  tailwindcss: false,
}

export const config = (props: ConfigProps) => {
  const { tailwindcss } = merge({ ...DefaultConfigProps }, props || {})
  const confArray = []

  if (tailwindcss) {
    confArray.push(...pluginTailwindCSS.configs['flat/recommended'])
  }

  confArray.push(
    stylistic.configs.customize(),
    {
      rules: {
        '@stylistic/max-len': [ 'error', { code: 120 } ],
        '@stylistic/quotes': [ 2, 'single', { avoidEscape: true,
          allowTemplateLiterals: false } ],
        '@stylistic/arrow-parens': [ 'error', 'as-needed' ],
        '@stylistic/brace-style': [ 'error', '1tbs', { allowSingleLine: true } ],
        '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
        '@stylistic/comma-dangle': [ 'error', {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        } ],
        '@stylistic/block-spacing': [ 'error', 'always' ],
        '@stylistic/computed-property-spacing': [ 'error' ],
        '@stylistic/operator-linebreak': [ 'error' ],
        '@stylistic/function-call-spacing': [ 'error' ],
        '@stylistic/function-paren-newline': [ 'error' ],
      },
    }
  )

  return confArray
}

export default config
