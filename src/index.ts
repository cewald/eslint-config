import { createRequire } from 'module'
import { major } from 'semver'

import vue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import pluginTailwindCSS from 'eslint-plugin-better-tailwindcss'
import merge from 'deepmerge'

export { default as prettier } from './prettier.js'

export type ConfigProps = {
  initVuePlugin?: boolean
  useStylisticPlugin?: boolean
  initStylisticPlugin?: boolean
  stylistic?: StylisticCustomizeOptions
  tailwindcss?: boolean
  tailwindcssConfig?: Record<string, unknown> & {
    config?: string
    customClassProperties?: string[]
  }
}

const DefaultConfigProps: ConfigProps = {
  initVuePlugin: false,
  useStylisticPlugin: true,
  initStylisticPlugin: false,
  tailwindcss: true,
  tailwindcssConfig: {},
}

export const config = (props: ConfigProps) => {
  const {
    initVuePlugin,
    useStylisticPlugin,
    initStylisticPlugin,
    stylistic: stylisticConfig,
    tailwindcss,
    tailwindcssConfig,
  } = merge({ ...DefaultConfigProps }, props || {})
  const confArray = []

  if (tailwindcss) {
    const {
      config: configFile,
      customClassProperties,
      ...tailwindcssConfigRest
    } = tailwindcssConfig

    const require = createRequire(import.meta.url)
    const pkgPath = require.resolve('tailwindcss/package.json')
    const tailwindVersion = major(require(pkgPath).version || 3)

    confArray.push({
      plugins: { 'better-tailwindcss': pluginTailwindCSS },
      rules: { ...pluginTailwindCSS.configs['recommended-warn'].rules },
    })

    if (customClassProperties) {
      confArray.push({
        'better-tailwindcss': {
          attributes: [
            `^(${['class(Name)?', ...customClassProperties].join('|')})$`,
          ],
        },
      })
    }

    confArray.push({
      settings: {
        'better-tailwindcss': merge(
          {
            [tailwindVersion === 3 ? 'tailwindConfig' : 'entryPoint']:
              configFile,
          },
          tailwindcssConfigRest,
        ),
      },
      rules: {
        'better-tailwindcss/no-unregistered-classes':
          tailwindVersion === 4
            ? ['warn', { detectComponentClasses: true }]
            : 'off',
        'better-tailwindcss/enforce-consistent-line-wrapping': [
          'warn',
          {
            group: 'never',
            preferSingleLine: true,
            printWidth: 120,
            classesPerLine: 8,
          },
        ],
      },
    })
  }

  if (useStylisticPlugin) {
    if (initStylisticPlugin) {
      confArray.push(stylistic.configs.customize(stylisticConfig))
    }

    confArray.push({
      rules: {
        '@stylistic/max-len': ['error', { code: 120 }],
        '@stylistic/quotes': [
          2,
          'single',
          { avoidEscape: true, allowTemplateLiterals: 'never' },
        ],
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

  if (initVuePlugin) {
    confArray.push(...vue.configs['flat/recommended'])
  }

  confArray.push({
    rules: {
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    },
  })

  return confArray
}

export default config
