import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'

declare global {
  export type ConfigTypes = 'prettier' | 'stylistic'

  export type ConfigPropsVue = {
    vue?: boolean
    initVuePlugin?: boolean
  }

  export type ConfigPropsBase = {
    tailwindcss?: boolean
    tailwindcssConfig?: Record<string, unknown> & {
      config?: string
      customClassProperties?: string[]
    }
  } & ConfigPropsVue

  export type ConfigPropsStylistic = {
    type: 'stylistic'
    initStylisticPlugin?: boolean
    stylistic?: StylisticCustomizeOptions
  }

  export type ConfigPropsPrettier = {
    type: 'prettier'
  }

  export type ConfigInput =
    | (ConfigPropsStylistic & ConfigPropsBase)
    | (ConfigPropsPrettier & ConfigPropsBase)
}
