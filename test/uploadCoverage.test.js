import { assert } from "@jsenv/assert"
import { uploadCoverage } from "../index.js"

const actual = typeof uploadCoverage
const expected = "function"
assert({ actual, expected })
