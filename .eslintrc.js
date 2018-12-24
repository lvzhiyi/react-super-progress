module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        typescript: true
    },
    globals: {
        Promise: true,
        Raven: true
    },
    env: {
        browser: true,
        node: true
    },
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: [
            2,
            4,
            {
                SwitchCase: 1
            }
        ],
        'react/no-string-refs': 0,
        'react/jsx-indent': [2, 4],
        'react/prop-types': [
            0,
            {
                ignore: [
                    'children',
                    'className',
                    'global',
                    'match',
                    'history',
                    'location'
                ]
            }
        ],
        'no-console': 'warn'
    },
    overrides: {
        files: ['**/*.ts', '**/*.tsx'],
        parser: 'typescript-eslint-parser',
        rules: {
            'no-undef': 'off',
            'no-unused-expression': false
        }
    }
};
