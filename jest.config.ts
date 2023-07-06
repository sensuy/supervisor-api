import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    'src/main.ts',
    'src/config/*',
    '/src/.*\\.module\\.ts$',
    '/src/.*\\.decorator\\.ts$',
    '/src/.*\\.guard\\.ts$',
    '/src/.*\\.e2e-spec\\.ts$',
    '.*interfaces.*',
    '.*repositories.*',
    '/src/shared/migrations/*',
    '/src/shared/common.entity.ts',
    '/src/shared/constants.ts'
  ],
  collectCoverageFrom: [
    "src/**/*.(t|j)s",
  ],
  coverageProvider: "v8",
  coverageReporters: ["lcov"],
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  preset: 'ts-jest',
  rootDir: './',
  roots: [
    "<rootDir>"
  ],
  testEnvironment: "node",
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/e2e/'
  ],
  testRegex: [".*\\.spec\\.ts$"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
};
