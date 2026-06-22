# Decision Log

Use this directory for durable product, architecture, and design decisions that future changes should not rediscover from scratch.

## When to add a decision note

Add a note when a choice affects:

- portfolio positioning or audience framing
- design-system direction or visual rules
- routing, localization, or information architecture
- how proprietary/internal company work is represented
- testing or verification policy

## Suggested format

Use one file per durable decision:

```md
# 0001-short-title

## Status
Accepted

## Context
Why this decision was needed.

## Decision
What was chosen.

## Consequences
What this enables, constrains, or requires going forward.
```

## Current decisions worth preserving

1. The portfolio is optimized for backend, platform, and AI systems positioning rather than generalist branding.
2. `DESIGN.md` is the canonical design system and UI contract.
3. Language is part of the URL (`/:lang/*`) and EN/PT parity matters for user-facing content.
4. Internal company work should be presented as bounded case studies, not fake public repositories.
5. Storybook and a11y checks are part of the preferred visual quality loop.
