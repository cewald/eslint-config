import stylistic from '@stylistic/eslint-plugin'
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import pluginTailwindCSS from 'eslint-plugin-tailwindcss'
import merge from 'deepmerge'

export type ConfigProps = {
  initStylisticPlugin?: boolean
  stylistic?: StylisticCustomizeOptions
  tailwindcss?: boolean
  tailwindcssConfig?: Record<string, unknown>
}

const DefaultConfigProps: ConfigProps = {
  initStylisticPlugin: true,
  tailwindcss: true,
  tailwindcssConfig: {},
}

export const config = (props: ConfigProps) => {
  const {
    initStylisticPlugin,
    stylistic: stylisticConfig,
    tailwindcss,
    tailwindcssConfig,
  } = merge({ ...DefaultConfigProps }, props || {})
  const confArray = []

  if (tailwindcss) {
    confArray.push(...pluginTailwindCSS.configs['flat/recommended'])
    confArray.push({
      settings: {
        tailwindcss: merge({
          cssFiles: [
            'src/**/*.{css,scss}',
          ],
        }, tailwindcssConfig),
      },
    })
  }

  if (initStylisticPlugin) {
    confArray.push(stylistic.configs.customize(stylisticConfig))
  }

  confArray.push({
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
  })

  return confArray
}

export default config
