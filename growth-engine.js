/**
 * Evidence-based aggregate growth metrics. No default or "Savior" scores.
 */
export function analyzeGrowth({ metrics, consent = false, locked = false } = {}) {
  if (locked) {
    return { mode: "LOCKED", status: "blocked", metrics: null, note: "Growth analysis is disabled by policy." };
  }
  if (consent !== true) {
    return { mode: "CONSENT_REQUIRED", status: "not_available", metrics: null, note: "Explicit analytics consent is required." };
  }
  if (!metrics || typeof metrics !== "object" || Array.isArray(metrics)) {
    return { mode: "INSUFFICIENT_DATA", status: "not_available", metrics: null, note: "Verified aggregate metrics are required." };
  }

  const { currentUsers, previousUsers, reach, periodDays } = metrics;
  for (const [name, value] of Object.entries({ currentUsers, previousUsers, reach, periodDays })) {
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new TypeError(name + " must be a non-negative safe integer.");
    }
  }
  if (periodDays < 1) throw new RangeError("periodDays must be at least 1.");

  const growthRatePercent = previousUsers === 0
    ? null
    : Number((((currentUsers - previousUsers) / previousUsers) * 100).toFixed(2));

  return {
    mode: "MEASURED",
    status: "available",
    metrics: {
      currentUsers,
      previousUsers,
      netChange: currentUsers - previousUsers,
      growthRatePercent,
      reach,
      periodDays
    },
    note: "Only caller-supplied aggregate measurements are reported; no influence or reach is fabricated."
  };
}
