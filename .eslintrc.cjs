module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','n8n-nodes-base'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:n8n-nodes-base/community'
  ],
  ignorePatterns: ['dist/**'],
};
