---
name: "API Security"
description: "Use when creating or changing Express routes, request handlers, authentication, database access, tokens, passwords, errors, or other security-sensitive TypeScript API code."
applyTo: "src/**/*.ts"
---

# API Security Rules

- Validate request bodies at the route boundary with a Zod schema. Reject unknown or malformed fields with a generic `400` response.
- Normalize identifiers only after validation; do not silently coerce arbitrary objects to strings.
- Parameterize SQL as `query(statement, [value])`; placeholders belong in the statement and values belong in the parameter array.
- Require `JWT_SECRET` to be present and at least 32 characters. Do not use a default.
- Use `bcryptjs` async `hash` and `compare` for passwords with a work factor of at least 12.
- Apply `express-rate-limit` to login, registration, password reset, and token endpoints.
- Send generic `4xx` and `5xx` messages. Pass diagnostic detail to server-side observability only.
- Keep authentication failures indistinguishable where account discovery would enable enumeration.