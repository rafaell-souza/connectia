module.exports = {
    moduleFileExtensions: "ts",
    rootDir: "./",
    testEnvironment: "node",
    testRegex: ".*\\.spec\\.ts$", 
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    moduleNameMapper: {
      "^src/(.*)$": "<rootDir>/src/$1" 
    }
  };
  