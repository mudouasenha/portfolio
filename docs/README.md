# Documentation Index

Use this folder as the operational layer that connects the repo goal, design direction, and technical reference docs.

## Reading Order

1. `README.md` — repo overview and setup
2. `PRODUCT.md` — what the portfolio is trying to achieve
3. `DESIGN.md` — how that intent is expressed visually
4. `AGENTS.md` — how humans and agents should work in the repo
5. `docs/workflow.md` — recommended execution loop

## Reference Map

### Product and direction
- `PRODUCT.md` — audience, success criteria, non-goals, messaging priorities
- `DESIGN.md` — canonical design system and UI contract

### Working rules
- `AGENTS.md` — workflow, skill routing, documentation hygiene
- `docs/workflow.md` — practical step-by-step execution loop

### Technical reference
- `.planning/codebase/ARCHITECTURE.md` — runtime architecture and routing flow
- `.planning/codebase/STRUCTURE.md` — directory roles and file layout
- `.planning/codebase/CONVENTIONS.md` — coding and component conventions
- `.planning/codebase/TESTING.md` — verification approach and testing posture
- `.planning/codebase/STACK.md` — tooling and dependency overview
- `.planning/codebase/INTEGRATIONS.md` — third-party integrations
- `.planning/codebase/CONCERNS.md` — known risks and fragile areas

### Decisions
- `docs/decisions/README.md` — decision-log format and active decisions worth preserving

## When to Update Which Doc

| Change type | Update |
|---|---|
| Repo setup, commands, structure overview | `README.md` |
| Audience, positioning, messaging priorities | `PRODUCT.md` |
| Color, typography, component styling, layout rules | `DESIGN.md` |
| Workflow, agent rules, preferred skills | `AGENTS.md` or `docs/workflow.md` |
| Architecture or routing changes | `.planning/codebase/ARCHITECTURE.md` |
| Naming or coding pattern changes | `.planning/codebase/CONVENTIONS.md` |
| Verification strategy changes | `.planning/codebase/TESTING.md` |
| Important durable decisions | `docs/decisions/*.md` |
