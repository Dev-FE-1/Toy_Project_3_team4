module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'functions/tsconfig.json',
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/generated/**/*', // Ignore generated files.
    '.eslintrc.cjs',
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    indent: ['error', 2],
    'new-cap': 'off',
    // 'new-cap': ['error', { capIsNewExceptions: ['Router'] }],
    'require-jsdoc': 'off',
    'import/no-unresolved': 0,
    'object-curly-spacing': ['error', 'always'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
