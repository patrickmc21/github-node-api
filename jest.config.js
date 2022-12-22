module.exports = {
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
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json'}]
  },
};
