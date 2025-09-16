import pluginJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import config from '@cewald/eslint-config'

export default [
  { ignores: ['node_modules', 'dist'] },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  ...config(),
]
