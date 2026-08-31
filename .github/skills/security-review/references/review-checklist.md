# Review Checklist

Apply only relevant checks. This is a thinking aid, not a compliance checklist.

## Boundaries and Input

- Which values can an attacker control, including headers, body, path, query, environment, files, and dependency responses?
- Is input validated by shape, type, length, range, and allowed value before privileged work?
- Can ambiguous normalization, coercion, or encoding bypass validation?

## Identity and Abuse

- Are authentication and authorization checked independently at the correct boundary?
- Can responses reveal whether an account or resource exists?
- Are credential, token, invitation, and recovery flows resistant to replay and high-rate attempts?

## Sensitive Sinks

- Are SQL and commands parameterized rather than assembled from input?
- Are passwords handled with an adaptive password hash?
- Do secrets fail closed when missing, stay out of source, and avoid client responses and logs?
- Do client errors avoid internal details while preserving server-side diagnostics?

## Verification

- Is there a negative test for the abuse case?
- Does the test prove privileged dependencies were not invoked after rejection?
- Which controls remain outside this repository, such as deployment policy, CodeQL, secret scanning, dependency review, or runtime monitoring?