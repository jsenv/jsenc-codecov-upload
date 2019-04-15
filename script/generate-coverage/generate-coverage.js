const { cover } = require("@jsenv/core")
const {
  projectFolder,
  importMapFilenameRelative,
  compileInto,
  babelConfigMap,
  testExecuteDescription,
  coverDescription,
  coverageFilenameRelative,
} = require("../../jsenv.config.js")

cover({
  projectFolder,
  importMapFilenameRelative,
  coverageFilenameRelative,
  compileInto,
  babelConfigMap,
  coverDescription,
  executeDescription: testExecuteDescription,
  compileGroupCount: 2,
  logCoverageTable: true,
  writeCoverageHtmlFolder: true,
})
