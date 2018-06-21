module.exports = {
  extends: 'airbnb',
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': [
      'error',
      { allow: ['_id', '__REDUX_DEVTOOLS_EXTENSION__'] }
    ],
    camelcase: 'off',
    'no-mixed-operators': 'off',
    'react/jsx-filename-extension': 'off'
  },
  env: {
    browser: true,
    node: true
  },
  plugins: ['transform-object-rest-spread']
  //   parserOptions: {
  //     'ecmaVersion': 2017
  //   }
};
