# Security policy

## Supported versions

Security fixes go into the latest release of the `markasui` CLI and `@markasui/mcp` on npm, the component source in this repository (`main`), and the documentation site at https://markas.jenderalcorp.com. Older releases are not patched; update to the latest version.

## Reporting a vulnerability

Please do not open a public issue for security problems.

- Preferred: [report it privately on GitHub](https://github.com/ahmad-rian/markasui/security/advisories/new) (Security tab, "Report a vulnerability").
- Or email ahmadrian@jenderalcorp.com with "MarkasUI security" in the subject.

Include what is affected (component and framework, CLI, MCP server, registry, or the website), steps to reproduce or a proof of concept, and the impact you expect. You will get a reply within 3 working days and a status update at least every 7 days until the issue is resolved. Once a fix is released we will credit you in the advisory unless you ask us not to.

## Scope

In scope:

- Components that render user-provided content unsafely (for example XSS through props, slots or `href` values).
- The `markasui` CLI and `@markasui/mcp`: writing outside the target project, running unexpected commands, or trusting registry data in an unsafe way.
- The registry files under https://markas.jenderalcorp.com/r/ and the documentation site.

Out of scope: findings that need a compromised machine or browser, missing headers without a concrete impact, denial of service through traffic volume, and reports from automated scanners without a working proof.
