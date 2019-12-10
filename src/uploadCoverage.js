import { normalizeDirectoryUrl } from "./internal/normalizeDirectoryUrl.js"
import { resolveUrl, urlToFilePath } from "./internal/urlUtils.js"

const codecov = import.meta.require("codecov")

const upload = codecov.handleInput.upload

export const uploadCoverage = ({
  projectDirectoryUrl,
  coverageJsonFileRelativeUrl = "./coverage/coverage-final.json",
  token = process.env.CODECOV_TOKEN,
  ...rest
}) => {
  projectDirectoryUrl = normalizeDirectoryUrl(projectDirectoryUrl)
  const coverageJsonFileUrl = resolveUrl(coverageJsonFileRelativeUrl, projectDirectoryUrl)
  const coverageJsonFilePath = urlToFilePath(coverageJsonFileUrl)
  const projectDirectoryPath = urlToFilePath(projectDirectoryUrl)

  const options = {
    ...rest,
    ...(process.env.GITHUB_REPOSITORY ? readOptionsFromGithubAction() : {}),
    token,
    file: coverageJsonFilePath,
    root: projectDirectoryPath,
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
    pr: process.env.GITHUB_EVENT_NAME === "pull_request" ? getPullRequestNumber() : undefined,
    slug: process.env.GITHUB_REPOSITORY,
    root: process.env.GITHUB_WORKSPACE,
  }
}

// or maybe https://github.community/t5/GitHub-Actions/GitHub-Actions-no-way-to-get-PR-number-on-push-event/td-p/23433
const getPullRequestNumber = () => {
  const ref = process.env.GITHUB_REF
  const pullPrefix = "refs/pull/"
  const pullRequestNumberStartIndex = ref.indexOf(pullPrefix)
  if (pullRequestNumberStartIndex === -1) return undefined
  const afterPull = ref.slice(pullRequestNumberStartIndex + pullPrefix.length)
  const slashAfterPullIndex = afterPull.indexOf("/")
  if (slashAfterPullIndex === -1) return undefined
  const pullRequestNumberString = afterPull.slice(0, slashAfterPullIndex)
  return Number(pullRequestNumberString)
}

/**
 * Example of process.env for a pull request
 *
 * {
 *   process.env.HOME: '/home/runner',
 *   process.env.GITHUB_WORKFLOW: 'ci',
 *   process.env.GITHUB_ACTION: 'run',
 *   process.env.GITHUB_ACTOR: 'dmail',
 *   process.env.GITHUB_REPOSITORY: 'jsenv/jsenv-codecov-upload',
 *   process.env.GITHUB_EVENT_NAME: 'pull_request',
 *   process.env.GITHUB_EVENT_PATH: '/home/runner/work/_temp/_github_workflow/event.json',
 *   process.env.GITHUB_WORKSPACE: '/home/runner/work/jsenv-codecov-upload/jsenv-codecov-upload',
 *   process.env.GITHUB_SHA: 'e42f8c0500aa7396f5b4fd893b4fdade8b31f354',
 *   process.env.GITHUB_REF: 'refs/pull/1/merge',
 *   process.env.GITHUB_HEAD_REF: 'github-actions',
 *   process.env.GITHUB_BASE_REF: 'master'
 * }
 *
 */
