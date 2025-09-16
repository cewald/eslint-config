import { createRequire } from 'module'
import { major } from 'semver'

import vuePlugin from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import pluginTailwindCSS from 'eslint-plugin-better-tailwindcss'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import merge from 'deepmerge'

export * from './types.js'

export const config = (props: ConfigInput = { type: 'prettier' }) => {
  const confArray = []
  const { type, tailwindcss = false, vue = false } = props

  if (tailwindcss && type !== 'prettier') {
    const { tailwindcssConfig } = props
    const { config: configFile, customClassProperties, ...tailwindcssConfigRest } = tailwindcssConfig || {}

    const require = createRequire(import.meta.url)
    const pkgPath = require.resolve('tailwindcss/package.json')
    const tailwindVersion = major(require(pkgPath).version || 3)

    confArray.push({
      plugins: { 'better-tailwindcss': pluginTailwindCSS },
      rules: { ...pluginTailwindCSS.configs['recommended-warn'].rules },
    })

    if (customClassProperties) {
      confArray.push({
        'better-tailwindcss': { attributes: [`^(${['class(Name)?', ...customClassProperties].join('|')})$`] },
      })
    }

    confArray.push({
      settings: {
        'better-tailwindcss': merge(
          { [tailwindVersion === 3 ? 'tailwindConfig' : 'entryPoint']: configFile },
          tailwindcssConfigRest,
        ),
      },
      rules: {
        'better-tailwindcss/no-unregistered-classes':
          tailwindVersion === 4 ? ['warn', { detectComponentClasses: true }] : 'off',
        'better-tailwindcss/enforce-consistent-line-wrapping': [
          'warn',
          { group: 'never', preferSingleLine: true, printWidth: 120, classesPerLine: 8 },
        ],
      },
    })
  }

  if (vue) {
    const { initVuePlugin } = props

    if (initVuePlugin) {
      confArray.push(...vuePlugin.configs['flat/recommended'])
    }

    confArray.push({ rules: { 'vue/block-order': ['error', { order: ['script', 'template', 'style'] }] } })
  }

  if (type === 'prettier') {
    confArray.push(eslintConfigPrettier)
    confArray.push({ rules: { 'vue/first-attribute-linebreak': 'off' } })
  } else if (type === 'stylistic') {
    const { initStylisticPlugin, stylistic: stylisticConfig } = props

    if (initStylisticPlugin) {
      confArray.push(stylistic.configs.customize(stylisticConfig))
    }

    confArray.push({
      rules: {
        '@stylistic/max-len': ['error', { code: 120 }],
        '@stylistic/quotes': [2, 'single', { avoidEscape: true, allowTemplateLiterals: 'never' }],
        '@stylistic/arrow-parens': ['error', 'as-needed'],
        '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        '@stylistic/array-bracket-spacing': ['error', 'always'],
        '@stylistic/comma-dangle': [
          'error',
          {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
          },
        ],
        '@stylistic/block-spacing': ['error', 'always'],
        '@stylistic/computed-property-spacing': ['error'],
        '@stylistic/operator-linebreak': ['error'],
        '@stylistic/function-call-spacing': ['error'],
        '@stylistic/function-paren-newline': ['error'],
      },
    })
  }

  return confArray
}

export default config
