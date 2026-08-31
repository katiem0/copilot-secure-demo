# Project Guidelines

This repository demonstrates secure-by-default development for a TypeScript Express API.

## Security Baseline

- Treat request data, environment variables, database results, and external responses as untrusted.
- Prefer allowlists and deny by default. Do not weaken a security control merely to make a test pass.
- Never interpolate untrusted values into SQL. Use placeholders and parameter arrays.
- Never add hardcoded credentials or fallback secrets. Validate required configuration at startup.
- Use adaptive password hashing through `bcryptjs`; never use general-purpose digests for passwords.
- Return generic client errors and keep stack traces, query details, tokens, and personal data out of responses and logs.
- Add abuse controls to authentication and recovery endpoints.
- When security behavior changes, add a negative test that proves the unsafe case is rejected.

## Working Agreement

- Before editing, state the trust boundary and likely abuse case in one sentence.
- Keep fixes focused and preserve public behavior unless insecure behavior must change.
- Run `npm run check` after code changes and `npm run security:check` after security-sensitive changes.
- Record known baseline findings before editing and do not silently absorb unrelated remediation into a focused task.
- Report remaining risk and assumptions; do not claim that passing tests proves the code is secure.
- No agent or session may both modify an artifact and provide final security approval for it.