import test from "node:test";
import assert from "node:assert/strict";
import { analyzeGrowth } from "../growth-engine.js";
test("growth engine never reports fabricated reach or influence", () => {
  const result = analyzeGrowth("private-user");
  assert.equal(result.status, "not_implemented");
  assert.equal(result.metrics, null);
  assert.equal("globalReach" in result, false);
  assert.equal("expansionRate" in result, false);
  assert.equal("influenceScore" in result, false);
});
