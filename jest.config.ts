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
    '/src/.*\\.e2e-spec\\.ts$',
    // '/src/shared/migrations/*',
    // '/src/shared/interfaces/*',
    // '/src/shared/common.entity.ts',
    // '/src/shared/constants.ts',
    // '/src/modules/auth/user/interfaces/*',
    // '/src/modules/auth/user/repositories/*'
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
