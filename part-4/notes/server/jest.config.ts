// @ts-ignore
const { compilerOptions } = require("./tsconfig.json");
import { pathsToModuleNameMapper } from "ts-jest";

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  setupFiles: ["tsconfig-paths/register"],
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
};
