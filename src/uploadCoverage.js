const codecov = import.meta.require("codecov")

const upload = codecov.handleInput.upload

export const uploadCoverage = ({
  projectFolder,
  coverageFilenameRelative = "coverage/coverage-final.json",
  token = process.env.CODECOV_TOKEN,
}) => {
  const filename = `${projectFolder}/${coverageFilenameRelative}`

  return new Promise((resolve, reject) => {
    // https://github.com/codecov/codecov-node/blob/023d204c671bc7d66b72261d2da07f2b72da2669/lib/codecov.js#L238
    upload(
      {
        options: {
          token,
          file: filename,
          root: projectFolder,
        },
      },
      resolve,
      reject,
    )
  })
}
