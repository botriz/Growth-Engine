# Suraya Growth Engine

A deterministic library for reporting aggregate growth metrics supplied by a trusted caller. It does not collect analytics, predict influence, or invent audience numbers.

## API

`analyzeGrowth({ metrics, consent, locked })`

- Requires explicit consent and caller-supplied measurements.
- Returns no metrics if consent is absent or measurements are missing.
- A locked policy blocks analysis.
- Calculates net change and percentage growth only from supplied integer counts.
- Does not return fabricated reach, influence, or "unlimited" values.

Metrics shape: `{ currentUsers, previousUsers, reach, periodDays }`. All fields must be non-negative safe integers; `periodDays` must be at least 1. When `previousUsers` is zero, growth percentage is `null`.

## Validation

```bash
npm test
```
