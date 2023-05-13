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
    '/src/shared/migrations/*',
  ],
  collectCoverageFrom: [
    "src/**/*.(t|j)s",
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
  setupFil: ["<rootDir>/.env.test"],
  
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
