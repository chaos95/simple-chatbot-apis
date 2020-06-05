module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
        mocha: true
    },
    extends: [
        'standard'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4],
        semi: 'off',
        '@typescript-eslint/semi': ['error', 'always']
    }
};
