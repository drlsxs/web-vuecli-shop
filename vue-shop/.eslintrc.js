module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-multiple-empty-lines':0,
    'object-curly-spacing':0,
    'key-spacing':0,
    'comma-spacing':0,
    'indent':0,
    'space-before-function-paren':0,
    'semi':0,
    'no-trailing-spaces':0,
    'eol-last':0,
    'space-before-blocks':0,
    'padded-blocks':0,
    'curly':0,
    'template-curly-spacing':0,
    'space-infix-ops':0,
    'quotes':0



  }
}
