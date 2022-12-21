module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  setupFiles: [
    './test-import.ts'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
