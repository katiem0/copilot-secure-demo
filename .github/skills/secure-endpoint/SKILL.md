---
name: secure-endpoint
description: "Implement one sensitive Express endpoint through delegated threat modeling, focused implementation, deterministic validation, and read-only security review."
argument-hint: "Describe the endpoint, intended caller, protected asset, and likely abuse case"
disable-model-invocation: true
---

# Secure Endpoint

Select **Secure Feature Lead** as the top-level agent before invoking this skill. A skill does not select an agent. If the lead or its specialist delegation is unavailable, stop before editing and explain what is unavailable; do not substitute a simulated review.

Implement the requested endpoint in this repository using the Secure Feature Lead workflow.

Before editing, briefly identify:

1. The caller and protected asset.
2. Untrusted inputs and the trust boundary.
3. The most likely abuse case.

Delegate threat modeling to **Threat Modeler** before implementing the smallest complete change that follows the repository instructions. Add focused positive and negative tests, including a test for the named abuse case. Run `npm run check` and `npm run security:check`, preserving the known baseline finding IDs. After validation, delegate a read-only review to **Security Reviewer**.

Finish with changed behavior, controls added, raw validation outcomes, unedited reviewer findings, and residual risk. Delegated review is advisory; do not describe the endpoint as secure or approved solely because checks pass.
