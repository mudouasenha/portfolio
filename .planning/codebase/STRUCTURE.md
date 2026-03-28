# Codebase Structure

**Analysis Date:** 2026-03-28

## Directory Layout

```
[project-root]/
├── .planning/                 # Project planning artifacts (codebase maps, phases, etc.)
│   └── codebase/              # Generated architecture/structure docs
├── public/                    # Static public assets served as-is by Vite
├── src/                       # Application source (React SPA)
│   ├── assets/                # Images used by components (imported by bundler)
│   │   ├── certifications/    # Certification badges (e.g., SVG)
│   │   └── projects/          # Project images (JPG)
│   ├── components/            # UI sections and shared UI pieces
│   ├── constants/             # Static data/constants used by UI
│   ├── locales/               # i18next translation resources
│   │   ├── en/                # English resources
│   │   └── pt/                # Portuguese resources
│   ├── models/                # Lightweight typed classes for translation-backed data
│   ├── App.tsx                # Page composition (section stack)
│   ├── LangRouter.tsx         # Language validation + i18n synchronization
│   ├── MainRoutes.tsx         # Router config (/ -> /en, :lang/*)
│   ├── i18n.tsx               # i18next initialization and resource wiring
│   └── main.tsx               # React root mount + BrowserRouter + MainRoutes
├── index.html                 # Vite entry HTML (loads /src/main.tsx)
├── vite.config.ts             # Vite configuration
├── package.json               # Scripts and dependencies
└── tsconfig*.json             # TypeScript project configs
```

## Directory Purposes

**`src/`:**
- Purpose: All application logic and UI code.
- Contains: Routing (`src/MainRoutes.tsx`), localization (`src/i18n.tsx`), page composition (`src/App.tsx`), UI sections (`src/components/*.tsx`).
- Key files: `src/main.tsx`, `src/MainRoutes.tsx`, `src/LangRouter.tsx`, `src/App.tsx`

**`src/components/`:**
- Purpose: Visual sections and reusable UI pieces.
- Contains: Section components like `src/components/Hero.tsx`, `src/components/Experience.tsx`, `src/components/Projects.tsx`, plus small UI helpers like `src/components/Tag.tsx`.
- Key files: `src/components/Navbar.tsx`, `src/components/LanguageSwitcher.tsx`

**`src/locales/`:**
- Purpose: Translation keys and structured content per language.
- Contains: `src/locales/en/translation.json`, `src/locales/pt/translation.json`.
- Key files: `src/i18n.tsx` wires these resources into i18next.

**`src/models/`:**
- Purpose: Typed wrappers for translation-driven content objects.
- Contains: Simple classes (e.g., `src/models/Project.tsx`, `src/models/ContactInfo.tsx`) used by components to shape data.
- Key files: `src/models/Project.tsx`, `src/models/ExperienceItem.tsx`

**`src/assets/`:**
- Purpose: Images imported into the bundle and referenced by components/constants.
- Contains: Project images in `src/assets/projects/*` and badges in `src/assets/certifications/*`.
- Key files: `src/constants/index.ts` and components like `src/components/Projects.tsx` import from here.

**`public/`:**
- Purpose: Static assets served directly (not inspected here; typically includes robots, icons, etc.).
- Contains: Not enumerated in this mapping (directory exists at `public/`).

## Key File Locations

**Entry Points:**
- `index.html`: Loads the app module entry `src/main.tsx`.
- `src/main.tsx`: Initializes i18n (`import './i18n'`) and renders `<BrowserRouter><MainRoutes /></BrowserRouter>`.

**Configuration:**
- `vite.config.ts`: Vite + React SWC plugin configuration.
- `eslint.config.js`: ESLint configuration.
- `tailwind.config.js`, `postcss.config.js`, `src/index.css`: Tailwind/CSS pipeline and global styling entry.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript project setup.

**Core Logic:**
- `src/MainRoutes.tsx`: Route table and redirects.
- `src/LangRouter.tsx`: Language param validation and `i18n.changeLanguage(...)` gating.
- `src/i18n.tsx`: i18next setup with `src/locales/**/translation.json` resources.

**Testing:**
- Not detected (no `*.test.*`/`*.spec.*` files in `src/` at the current scan depth).

## Naming Conventions

**Files:**
- React components use PascalCase filenames (e.g., `src/components/Projects.tsx`, `src/App.tsx`).
- Cross-cutting modules also use PascalCase when component-like (`src/LangRouter.tsx`, `src/MainRoutes.tsx`) and lowercase for infra (`src/main.tsx`, `src/i18n.tsx`).

**Directories:**
- Feature buckets are lowercase and plural where appropriate (`src/components/`, `src/models/`, `src/locales/`, `src/assets/`).

## Where to Add New Code

**New Section/Component:**
- Implementation: `src/components/<NewSection>.tsx`
- Wiring into page: Add to `src/App.tsx` section order.
- Translated content: Add keys/objects to `src/locales/en/translation.json` and `src/locales/pt/translation.json`.

**New Route Behavior:**
- Routing table changes: `src/MainRoutes.tsx`
- Language-aware behavior: `src/LangRouter.tsx` and `src/components/LanguageSwitcher.tsx`

**New Translation-Backed Model:**
- Model class: `src/models/<Thing>.tsx`
- Component usage: Map `t('key', { returnObjects: true })` results into `new <Thing>(...)` (pattern in `src/components/Projects.tsx`).

**New Images/Static Media:**
- Bundled imports: place under `src/assets/` and import from components (pattern in `src/components/Certifications.tsx`).
- Public, URL-addressable assets: place under `public/` (served as-is).

## Special Directories

**`.planning/`:**
- Purpose: Stores generated planning and mapping documents.
- Generated: Yes (documentation artifacts).
- Committed: Unknown from current scan (directory present at `.planning/`).

---

*Structure analysis: 2026-03-28*

