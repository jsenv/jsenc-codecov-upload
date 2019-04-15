const { createConfig } = require("@jsenv/eslint-config")
const { projectFolder, importMapFilenameRelative } = require("./jsenv.config.js")

const config = createConfig()
config.rules["import/no-absolute-path"] = ["off"]
config.settings["import/resolver"] = {
  [`${projectFolder}/node_modules/@jsenv/eslint-import-resolver/dist/node/main.js`]: {
    projectFolder,
    importMapFilenameRelative,
  },
}

module.exports = config
