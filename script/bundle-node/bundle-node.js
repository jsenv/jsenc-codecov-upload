const { bundleNode } = require("@jsenv/core")
const {
  projectFolder,
  importMapFilenameRelative,
  babelConfigMap,
} = require("../../jsenv.config.js")

bundleNode({
  projectFolder,
  importMapFilenameRelative,
  into: "dist/node",
  entryPointMap: {
    main: "index.js",
  },
  babelConfigMap,
})
