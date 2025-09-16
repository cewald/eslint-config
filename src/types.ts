import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { Options as PrettierOptions } from 'prettier'
import { PluginOptions as PrettierTailwindOptions } from 'prettier-plugin-tailwindcss'

declare global {
  export type ConfigTypes = 'prettier' | 'stylistic'

  export type ConfigPropsVue = { vue?: boolean; initVuePlugin?: boolean }

  export type ConfigPropsTailwind = {
    tailwindcss?: boolean
    tailwindcssConfig?: Record<string, unknown> & { config?: string; customClassProperties?: string[] }
  }

  export type ConfigPropsBase = ConfigPropsTailwind & ConfigPropsVue

  export type ConfigPropsStylistic = {
    type: 'stylistic'
    initStylisticPlugin?: boolean
    stylistic?: StylisticCustomizeOptions
  }

  export type ConfigPropsPrettier = { type: 'prettier' }

  export type ConfigInput = (ConfigPropsStylistic & ConfigPropsBase) | (ConfigPropsPrettier & ConfigPropsBase)

  export type PrettierOptionsReturn = PrettierOptions & PrettierTailwindOptions
}
