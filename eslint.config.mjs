import pluginJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import {config} from '@cewald/eslint-config'

export default [
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  ...config({ tailwindcss: true }),
]
