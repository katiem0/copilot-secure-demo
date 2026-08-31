---
name: security-review
description: "Perform a repeatable, evidence-based application security review with a threat model, structured procedure, progressive checklist, prioritized findings, and remediation plan. Use for security review, threat modeling, OWASP risk assessment, auth or database inspection, or security-sensitive change verification."
argument-hint: "Feature, file, or diff to review"
user-invocable: true
---

# Security Review

Use this workflow for review and remediation planning. Read [review checklist](./references/review-checklist.md) only after identifying the technologies and trust boundaries in scope.

## Procedure

1. Define scope: identify entry points, callers, assets, trust boundaries, and attacker-controlled data.
2. Trace untrusted data to database, command, file, template, redirect, deserialization, authentication, authorization, cryptographic, and logging sinks.
3. Inspect nearby tests and configuration for controls and gaps.
4. Run the narrowest relevant existing checks. In this demo, capture existing finding IDs before changes and compare `npm test` with `npm run security:check`.
5. Rank only evidenced findings as `CRITICAL`, `HIGH`, `MEDIUM`, or `LOW` based on exploitability and impact.
6. Recommend the smallest fix plus a negative regression test for each finding.
7. State assumptions, checks not run, and residual risk.

## Guardrails

- Do not equate a clean dependency audit, passing tests, or a model response with a security guarantee.
- Do not treat delegated review from an implementing session as independent approval.
- Do not make up findings to fill a category.
- Do not reveal secret values or personal data.
- Keep architectural hardening separate from exploitable findings.

## Output Format

Return `Findings`, `Threat model`, `Validation`, and `Residual risk`. Findings come first and include evidence, impact, fix, and regression test.