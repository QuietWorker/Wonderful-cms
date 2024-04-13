/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  rules: {
    // 如果组件名称为 index，ESLint 就会忽略此次组件名称的检查
    'vue/multi-word-component-names': [
      'warn',
      {
        // 指定需要忽略的组件名称
        ignores: ['index']
      }
    ]
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
};
