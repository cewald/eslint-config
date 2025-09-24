import eslintConfigPrettier from 'eslint-config-prettier/flat'
import vuePlugin from 'eslint-plugin-vue'

export * from './types.js'

export const config = (props: ConfigInput = {}) => {
  const confArray = []
  const { vue = false } = props

  confArray.push({
    rules: {
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          allowSeparatedGroups: false,
        },
      ],
    },
  })

  if (vue) {
    const { initVuePlugin } = props

    if (initVuePlugin) {
      confArray.push(...vuePlugin.configs['flat/recommended'])
    }

    confArray.push({
      rules: {
        'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
        'vue/block-lang': ['error', { script: { lang: 'ts' } }],
        'vue/eqeqeq': ['error', 'always'],
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
      },
    })
  }

  confArray.push(eslintConfigPrettier)

  return confArray
}

export default config
