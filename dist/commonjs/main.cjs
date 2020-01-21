'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var module$1 = require('module');
var url$1 = require('url');
var fs = require('fs');
require('crypto');
require('path');
var util = require('util');

// eslint-disable-next-line import/no-unresolved
const nodeRequire = require;
const filenameContainsBackSlashes = __filename.indexOf("\\") > -1;
const url = filenameContainsBackSlashes ? `file:///${__filename.replace(/\\/g, "/")}` : `file://${__filename}`;

const ensureUrlTrailingSlash = url => {
  return url.endsWith("/") ? url : `${url}/`;
};

const isFileSystemPath = value => {
  if (typeof value !== "string") {
    throw new TypeError(`isFileSystemPath first arg must be a string, got ${value}`);
  }

  if (value[0] === "/") return true;
  return startsWithWindowsDriveLetter(value);
};

const startsWithWindowsDriveLetter = string => {
  const firstChar = string[0];
  if (!/[a-zA-Z]/.test(firstChar)) return false;
  const secondChar = string[1];
  if (secondChar !== ":") return false;
  return true;
};

const fileSystemPathToUrl = value => {
  if (!isFileSystemPath(value)) {
    throw new Error(`received an invalid value for fileSystemPath: ${value}`);
  }

  return String(url$1.pathToFileURL(value));
};

const assertAndNormalizeDirectoryUrl = value => {
  let urlString;

  if (value instanceof URL) {
    urlString = value.href;
  } else if (typeof value === "string") {
    if (isFileSystemPath(value)) {
      urlString = fileSystemPathToUrl(value);
    } else {
      try {
        urlString = String(new URL(value));
      } catch (e) {
        throw new TypeError(`directoryUrl must be a valid url, received ${value}`);
      }
    }
  } else {
    throw new TypeError(`directoryUrl must be a string or an url, received ${value}`);
  }

  if (!urlString.startsWith("file://")) {
    throw new Error(`directoryUrl must starts with file://, received ${value}`);
  }

  return ensureUrlTrailingSlash(urlString);
};

const urlToFileSystemPath = fileUrl => {
  if (fileUrl[fileUrl.length - 1] === "/") {
    // remove trailing / so that nodejs path becomes predictable otherwise it logs
    // the trailing slash on linux but does not on windows
    fileUrl = fileUrl.slice(0, -1);
  }

  const fileSystemPath = url$1.fileURLToPath(fileUrl);
  return fileSystemPath;
};

const isWindows = process.platform === "win32";

const resolveUrl = (specifier, baseUrl) => {
  if (typeof baseUrl === "undefined") {
    throw new TypeError(`baseUrl missing to resolve ${specifier}`);
  }

  return String(new URL(specifier, baseUrl));
};

const isWindows$1 = process.platform === "win32";
const baseUrlFallback = fileSystemPathToUrl(process.cwd());

const isWindows$2 = process.platform === "win32";

const readFilePromisified = util.promisify(fs.readFile);

const isWindows$3 = process.platform === "win32";

/* eslint-disable import/max-dependencies */
const isLinux = process.platform === "linux"; // linux does not support recursive option

const require$1 = module$1.createRequire(url);

const codecov = require$1("codecov");

const upload = codecov.handleInput.upload;
const uploadCoverage = ({
  projectDirectoryUrl,
  coverageJsonFileRelativeUrl = "./coverage/coverage-final.json",
  token = process.env.CODECOV_TOKEN,
  ...rest
}) => {
  projectDirectoryUrl = assertAndNormalizeDirectoryUrl(projectDirectoryUrl);
  const coverageJsonFileUrl = resolveUrl(coverageJsonFileRelativeUrl, projectDirectoryUrl);
  const options = { ...rest,
    ...(process.env.GITHUB_REPOSITORY ? readOptionsFromGithubAction() : {}),
    token,
    file: urlToFileSystemPath(coverageJsonFileUrl),
    root: urlToFileSystemPath(projectDirectoryUrl)
  };
  return new Promise((resolve, reject) => {
    // https://github.com/codecov/codecov-node/blob/023d204c671bc7d66b72261d2da07f2b72da2669/lib/codecov.js#L238
    upload({
      options
    }, resolve, reject);
  });
}; // https://help.github.com/en/articles/virtual-environments-for-github-actions#environment-variables
// https://github.com/codecov/codecov-node/blob/a7014d2e29d80424a240d8fa7d544e0ccf1601d0/lib/services/travis.js#L8

const readOptionsFromGithubAction = () => {
  return {
    commit: process.env.GITHUB_SHA,
    build: process.env.GITHUB_WORKFLOW,
    branch: process.env.GITHUB_REF,
    job: process.env.GITHUB_ACTION,
    pr: process.env.GITHUB_EVENT_NAME === "pull_request" ? getPullRequestNumber() : undefined,
    slug: process.env.GITHUB_REPOSITORY,
    root: process.env.GITHUB_WORKSPACE
  };
}; // or maybe https://github.community/t5/GitHub-Actions/GitHub-Actions-no-way-to-get-PR-number-on-push-event/td-p/23433


const getPullRequestNumber = () => {
  const ref = process.env.GITHUB_REF;
  const pullPrefix = "refs/pull/";
  const pullRequestNumberStartIndex = ref.indexOf(pullPrefix);
  if (pullRequestNumberStartIndex === -1) return undefined;
  const afterPull = ref.slice(pullRequestNumberStartIndex + pullPrefix.length);
  const slashAfterPullIndex = afterPull.indexOf("/");
  if (slashAfterPullIndex === -1) return undefined;
  const pullRequestNumberString = afterPull.slice(0, slashAfterPullIndex);
  return Number(pullRequestNumberString);
};
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

exports.uploadCoverage = uploadCoverage;
//# sourceMappingURL=main.cjs.map
