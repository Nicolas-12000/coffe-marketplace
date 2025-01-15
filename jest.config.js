module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
      '@/(.*)': '<rootDir>/src/$1'
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'src/**/*.{js,ts}'
    ]
  };