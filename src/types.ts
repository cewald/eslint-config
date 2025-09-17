import type { Options as PrettierOptions } from 'prettier'
import { PluginOptions as PrettierTailwindOptions } from 'prettier-plugin-tailwindcss'
import { PrettierPluginOrganizeAttributesParserOptions } from 'prettier-plugin-organize-attributes'

declare global {
  export type ConfigTypes = 'prettier'

  export type ConfigPropsVue = { vue?: boolean; initVuePlugin?: boolean }

  export type ConfigPropsTailwind = {
    tailwindcss?: boolean
    tailwindcssConfig?: Record<string, unknown> & { config?: string; customClassProperties?: string[] }
  }

  export type ConfigInput = ConfigPropsTailwind & ConfigPropsVue

  export type PrettierOptionsReturn = PrettierOptions &
    PrettierTailwindOptions &
    Partial<PrettierPluginOrganizeAttributesParserOptions>
}
