# `@cewald/eslint-config` package source

This is a company-wide coding style-guide using `eslint`, `@stylistic/eslint-plugin` as formatter and optional linting for TailwindCSS using `eslint-plugin-tailwindcss`.

It should be applied to all JS/TS projects to unify the company coding-styles.

## Install & setup `eslint` and `prettier` with this package

1. Install packages:

   ```bash
   npm i -D eslint @cewald/eslint-config
   ```

1. Add `eslint.config.mjs` to root directory:

   ```js
   import config from '@cewald/eslint-config'

   export default [...config()]
   ```

1. For autoformat on save in VSCode, add VSCode settings to workspace settings in `.vscode/settings.json`:

   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": "always"
     }
   }
   ```

1. Add linting commands to `package.json`:

   ```json
   "scripts": {
      "lint": "eslint",
      "lint:fix": "eslint --fix",
   }
   ```

1. Remove unnecessary packages

## Setup linting and format pre-commit hooks with `husky`

With this configured changed files will automatically be formatted and linted on commit.

1. Install deps:

   ```bash
   npm i -D husky lint-staged
   ```

1. Create hook for `husky` in `.husky/pre-commit`:

   ```
   npx lint-staged
   ```

1. Add `lint-staged` config to `package.json`:
   ```json
   "lint-staged": {
    "*": [
      "npm run lint:fix"
    ]
   }
   ```

## Development

1. Simply run `npm run dev`
1. You can use `npm link` to use a local version in your local repos

## Debug `eslint` config

In case you have to debug rules or how they are applied, there is a whole guide for it here:  
https://eslint.org/docs/latest/use/configure/debug

Anyway the `config-inspector` is the best tool:  
https://eslint.org/docs/latest/use/configure/debug#use-the-config-inspector

Just run `npx eslint --inspect-config` from the root folder and you can see which rules are applied in a nice and conveniant interface.
