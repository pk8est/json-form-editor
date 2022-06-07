module.exports = {
  //extends: 'guo/vue',
  extends: 'plugin:vue/essential',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  rules: {
    'linebreak-style': [0 ,"error", "windows"],
    'valid-jsdoc': 'off',
    'array-bracket-spacing': 'off',
    "semi": 0,
    'indent':'off'
  }
};
