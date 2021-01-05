
module.exports = {
  singleQuote: true,
  jsxBracketSameLine: false,
  jsxSingleQuote: true,
  bracketSpacing: true,
  printWidth: 100,
  semi: true,
  tabWidth: 2,
  trailingComma: 'all',
  arrowParens: 'avoid',
  endOfLine: 'lf',
  embeddedLanguageFormatting:'auto',
  overrides: [
    {
      files: '*.json',
      options: {
        singleQuote: false,
        parser: 'json',
      },
    },
    {
      files: ['*.ts', '*tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};
