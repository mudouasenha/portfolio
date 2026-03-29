# Architecture Research

**Domain:** Developer portfolio SPA modernization  
**Researched:** 2026-03-28  
**Confidence:** HIGH

## Standard Architecture

### System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│ Presentation Layer                                          │
├─────────────────────────────────────────────────────────────┤
│  App Layout  |  Section Components  |  Shared UI Primitives│
├─────────────────────────────────────────────────────────────┤
│ Interaction and State Layer                                │
├─────────────────────────────────────────────────────────────┤
│  Router  |  i18n Sync  |  View-Model Mapping  |  Motion    │
├─────────────────────────────────────────────────────────────┤
│ Content and Assets Layer                                   │
├─────────────────────────────────────────────────────────────┤
│  Locale JSON  |  Static Images  |  Content Validation      │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| App shell (`App`, nav, sections) | Compose high-level information architecture | Section-oriented composition with shared layout primitives |
| UI primitives (`components/ui/*`) | Reusable visual and interaction building blocks | shadcn-generated components customized with tokens |
| Routing and localization layer | Keep language in URL and UI state synchronized | `react-router-dom` + i18next with guard logic |
| Content adapter | Transform locale objects into safe view data | runtime parsing + defensive fallback values |

## Recommended Project Structure

```text
src/
├── app/                     # app shell, route composition, providers
├── components/
│   ├── ui/                  # shadcn primitives and wrappers
│   └── sections/            # portfolio section components
├── features/
│   ├── i18n/                # language routing and translation hooks
│   └── portfolio/           # project-specific view models and mapping
├── content/                 # typed content adapters for locale resources
├── assets/                  # static images and media
├── styles/                  # global tokens, theme layers, utility extensions
└── tests/                   # integration and behavior tests
```

### Structure Rationale

- **`components/ui`** centralizes shared visual contracts and reduces style drift.
- **`components/sections`** keeps page section concerns isolated and easier to iterate.
- **`features/i18n`** protects language continuity behavior from unrelated UI changes.
- **`content`** isolates schema and data-safety concerns from rendering concerns.

## Architectural Patterns

### Pattern 1: Token-First UI Composition

**What:** Build all section UI from tokenized primitives (`bg-background`, `text-foreground`, etc.).  
**When to use:** All new and migrated UI components.  
**Trade-offs:** Requires up-front theme setup, but reduces long-term inconsistency.

### Pattern 2: Content Boundary Validation

**What:** Parse structured locale data once before rendering.  
**When to use:** For projects, skills, certifications, and contact payloads.  
**Trade-offs:** Slightly more code, much better runtime safety and debuggability.

### Pattern 3: Layered Motion Strategy

**What:** Define section-level and element-level motion rules with reduced-motion fallback.  
**When to use:** Hero reveals, section transitions, and interactive states.  
**Trade-offs:** Needs discipline to avoid animation bloat; improves perceived polish when controlled.

## Data Flow

### Request Flow

```text
URL (/:lang/*)
  -> Router guard
    -> i18n language sync
      -> Content extraction and validation
        -> Section rendering with UI primitives
```

### State Management

```text
Route param language
  -> i18n current language
    -> translated text and objects
      -> validated view models
        -> rendered section components
```

### Key Data Flows

1. **Language switch:** switcher updates URL segment, router updates i18n, sections re-render.
2. **Project rendering:** translation object -> validated project model -> image mapping -> project card UI.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-10k monthly visitors | Current SPA architecture is sufficient with bundle and image optimization. |
| 10k-100k monthly visitors | Add stronger caching strategy, image optimization workflow, and performance budgets. |
| 100k+ monthly visitors | Consider CDN-level optimization and potential content service separation. |

### Scaling Priorities

1. **First bottleneck:** asset weight and animation overhead - solved by image optimization and motion discipline.
2. **Second bottleneck:** content maintenance complexity - solved by typed content boundaries and optional CMS later.

## Anti-Patterns

### Anti-Pattern 1: Styling in isolated section silos

**What people do:** each section defines independent visual logic.  
**Why it is wrong:** inconsistent UI language and harder global changes.  
**Do this instead:** compose sections from shared shadcn primitives and shared token rules.

### Anti-Pattern 2: Unvalidated translation object casting

**What people do:** cast `t(..., { returnObjects: true })` directly to types.  
**Why it is wrong:** runtime data mismatch creates silent UI defects.  
**Do this instead:** validate translation-derived objects before rendering.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Vercel hosting | Static SPA deployment | Keep build output and base routing behavior compatible. |
| Social/contact links | External anchor links | Validate URLs and actionability as regression checks. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `features/i18n` <-> sections | Hooks + props | Keep language state source-of-truth in router/i18n layer. |
| `content` <-> sections | typed adapters | Sections should render already-sanitized view data. |
| `components/ui` <-> sections | composable props | Sections should not hardcode ad hoc design tokens. |

## Sources

- Local codebase mapping docs in `.planning/codebase/*`.
- https://ui.shadcn.com/docs/cli
- https://tailwindcss.com/docs/compatibility
- https://vite.dev/releases
- https://react.dev/blog/2024/04/25/react-19-upgrade-guide

---
*Architecture research for: developer portfolio modernization*  
*Researched: 2026-03-28*
