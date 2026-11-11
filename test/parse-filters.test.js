const assert = require("node:assert/strict")
const { test } = require("node:test")

const { parseFiltersParam } = require("../src/utils/parseFilters")

const ISSUE_210_URL =
  "https://www.gsocorganizations.dev/?filters=%7Bnot-json%7D"

test("malformed filters from issue #210 are treated as no active filters", () => {
  const raw = new URL(ISSUE_210_URL).searchParams.get("filters")
  assert.equal(raw, "{not-json}")
  assert.deepEqual(parseFiltersParam(raw), {})
})

test("non-object filters JSON is treated as no active filters", () => {
  for (const raw of ["[]", "5", '"years"', "null"]) {
    assert.deepEqual(parseFiltersParam(raw), {})
  }
})

test("missing filters param is treated as no active filters", () => {
  assert.deepEqual(parseFiltersParam(null), {})
})

test("valid filters JSON is still parsed", () => {
  const filters = { years: ["2024"], categories: [] }
  assert.deepEqual(parseFiltersParam(JSON.stringify(filters)), filters)
})
