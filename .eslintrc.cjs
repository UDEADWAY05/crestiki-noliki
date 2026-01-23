module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'next',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react-refresh/only-export-components': 'off',
        'no-empty-pattern': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        'prefer-const': 'warn'
    }
}
