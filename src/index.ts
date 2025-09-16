import vuePlugin from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export * from './types.js'

export const config = (props: ConfigInput = {}) => {
  const confArray = []
  const { vue = false } = props

  if (vue) {
    const { initVuePlugin } = props

    if (initVuePlugin) {
      confArray.push(...vuePlugin.configs['flat/recommended'])
    }

    confArray.push({
      rules: {
        'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      },
    })
  }

  confArray.push(eslintConfigPrettier)

  return confArray
}

export default config
