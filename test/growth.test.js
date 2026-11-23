import test from "node:test";
import assert from "node:assert/strict";
import { analyzeGrowth } from "../growth-engine.js";

test("growth metrics require explicit consent", () => {
  const result = analyzeGrowth({ metrics: { currentUsers: 20, previousUsers: 10, reach: 40, periodDays: 7 } });
  assert.equal(result.status, "not_available");
  assert.equal(result.metrics, null);
});

test("growth is calculated only from supplied measurements", () => {
  const result = analyzeGrowth({ consent: true, metrics: { currentUsers: 15, previousUsers: 10, reach: 100, periodDays: 7 } });
  assert.equal(result.status, "available");
  assert.equal(result.metrics.netChange, 5);
  assert.equal(result.metrics.growthRatePercent, 50);
  assert.equal(result.metrics.reach, 100);
  assert.equal("influenceScore" in result.metrics, false);
});

test("zero baseline has no invented percentage", () => {
  const result = analyzeGrowth({ consent: true, metrics: { currentUsers: 3, previousUsers: 0, reach: 3, periodDays: 1 } });
  assert.equal(result.metrics.growthRatePercent, null);
});

test("locked mode and invalid values fail safely", () => {
  assert.equal(analyzeGrowth({ consent: true, locked: true }).status, "blocked");
  assert.throws(() => analyzeGrowth({ consent: true, metrics: { currentUsers: -1, previousUsers: 0, reach: 0, periodDays: 1 } }), TypeError);
});
