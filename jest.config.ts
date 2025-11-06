import type { Config } from "jest";
const nextJest = require("next/jest.js").default;

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

module.exports = createJestConfig(config);
