import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  // coveragePathIgnorePatterns: [
  //   '/src/config/',
  // ],
  collectCoverageFrom: [
    "./src/**/*.(service|controller|middleware).(t|s)s",
  ],
  coverageProvider: "v8",
  coverageReporters: ["html"],
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