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
    version?: '4' | '3'
    customClassProperties?: string[]
  }
}

const DefaultConfigProps: ConfigProps = {
  initVuePlugin: false,
  useStylisticPlugin: true,
  initStylisticPlugin: false,
  tailwindcss: true,
  tailwindcssConfig: {
    version: '3',
  },
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
      version,
      config: configFile,
      customClassProperties,
      ...tailwindcssConfigRest
    } = tailwindcssConfig

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
            [version === '3' ? 'tailwindConfig' : 'entryPoint']: configFile,
          },
          tailwindcssConfigRest,
        ),
      },
      rules: {
        ...(version === '4'
          ? {
              'better-tailwindcss/no-unregistered-classes': [
                'warn',
                { detectComponentClasses: true },
              ],
            }
          : {}),
        'better-tailwindcss/enforce-consistent-line-wrapping': [
          'warn',
          {
            group: 'newLine',
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
          { avoidEscape: true, allowTemplateLiterals: false },
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
