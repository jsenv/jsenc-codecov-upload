const { test } = require("@jsenv/core")
const {
  projectFolder,
  compileInto,
  babelConfigMap,
  testExecuteDescription,
} = require("../../jsenv.config.js")

test({
  projectFolder,
  compileInto,
  executeDescription: testExecuteDescription,
  babelConfigMap,
})
