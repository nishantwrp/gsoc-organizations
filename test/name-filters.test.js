const assert = require("node:assert/strict")
const { test } = require("node:test")

const { filter } = require("../api/filters/name-filters")

test("normalizes known organization aliases", () => {
  assert.equal(filter("The Apertium Project"), "Apertium")
})

test("trims whitespace from organization names without aliases", () => {
  assert.equal(filter("  Example Organization  "), "Example Organization")
})
