const codecov = import.meta.require("codecov")

const upload = codecov.handleInput.upload

export const uploadCoverage = ({
  projectPath,
  coverageRelativePath = "/coverage/coverage-final.json",
  token = process.env.CODECOV_TOKEN,
  ...rest
}) => {
  const filename = `${projectPath}${coverageRelativePath}`
  const options = {
    ...rest,
    ...(process.env.GITHUB_REPOSITORY ? readOptionsFromGithubAction() : {}),
    token,
    file: filename,
    root: projectPath,
  }

  return new Promise((resolve, reject) => {
    // https://github.com/codecov/codecov-node/blob/023d204c671bc7d66b72261d2da07f2b72da2669/lib/codecov.js#L238
    upload(
      {
        options,
      },
      resolve,
      reject,
    )
  })
}

// https://help.github.com/en/articles/virtual-environments-for-github-actions#environment-variables
// https://github.com/codecov/codecov-node/blob/a7014d2e29d80424a240d8fa7d544e0ccf1601d0/lib/services/travis.js#L8
const readOptionsFromGithubAction = () => {
  return {
    commit: process.env.GITHUB_SHA,
    build: process.env.GITHUB_WORKFLOW,
    branch: process.env.GITHUB_REF,
    job: process.env.GITHUB_ACTION,
    pr: "",
    slug: process.env.GITHUB_REPOSITORY,
    root: process.env.GITHUB_WORKSPACE,
  }
}
