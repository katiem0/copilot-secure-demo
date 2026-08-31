---
name: "Security Tests"
description: "Use when writing tests for validation, authentication, authorization, injection, rate limiting, secrets, or secure error handling."
applyTo: "tests/**/*.test.ts"
---

# Security Test Rules

- Add negative tests for malformed input, boundary values, and representative malicious payloads.
- Assert externally observable behavior, not source-code strings or private implementation details.
- Verify rejected requests do not call the database or other privileged dependencies.
- Use obviously fake secrets in fixtures and set them through `process.env`.
- Avoid logging tokens, credentials, personal data, and complete error objects in test output.
- Name tests for the protection they prove, such as `rejects SQL injection input without querying the database`.