const { launchNode } = require("@jsenv/core")
const { babelConfigMap } = require("./node_modules/@jsenv/babel-config-map/index.js")

const projectFolder = __dirname
exports.projectFolder = projectFolder

const importMapFilenameRelative = "importMap.json"
exports.importMapFilenameRelative = importMapFilenameRelative

const coverageFilenameRelative = "coverage/coverage-final.json"
exports.coverageFilenameRelative = coverageFilenameRelative

const compileInto = ".dist"
exports.compileInto = compileInto

const testExecuteDescription = {
  "/test/**/*.test.js": {
    node: {
      launch: launchNode,
    },
  },
}
exports.testExecuteDescription = testExecuteDescription

const coverDescription = {
  "/index.js": true,
  "/src/**/*.js": true,
}
exports.coverDescription = coverDescription

exports.babelConfigMap = babelConfigMap
