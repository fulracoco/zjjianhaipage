# Repository Guidelines

## Project Overview

This repository contains the bilingual marketing site for Zhenjiang Jianhai Marine Parts. It is a Vue 3 single-page application built with Vite and deployed as static files. Keep changes focused on the requested page area and preserve the existing company, product, certification, and contact information unless the task explicitly changes it.

## Project Structure

- `index.html` is the Vite HTML entry and contains the default SEO metadata.
- `src/main.js` mounts the Vue application and imports global styles.
- `src/App.vue` owns the main page composition and content sections.
- `src/components/` contains reusable or independently maintained page sections.
- `src/composables/useSiteI18n.js` manages the active language, document metadata, URL language selection, and `localStorage` persistence.
- `src/data/assets.js` is the central image registry.
- `src/styles.css` contains global design tokens, component styles, language-specific rules, and responsive breakpoints.
- `i18n.js` exports synchronized Chinese (`zh`), English (`en`), Japanese (`ja`), and Korean (`ko`) dictionaries.
- `assets/` contains production images.
- `404.html` is a standalone error page outside the Vue application.
- `_headers`, `_redirects`, `robots.txt`, and `sitemap.xml` control deployment, caching, security, redirects, and indexing.
- `vite.config.js` copies required deployment files into `dist/` during production builds.
- `dist/`, `node_modules/`, and `.vite/` are generated directories. Do not edit them by hand or commit them.

## Development Commands

Install dependencies and start Vite:

```powershell
npm install
npm run dev
```

Create and preview a production build:

```powershell
npm run build
npm run preview
```

Use Node.js 20.19+ or 22.12+ for Vite 7 compatibility. There is currently no linter or automated test suite.

## Execution Autonomy

- When a task is requested, inspect the relevant files and execute the work directly without asking for confirmation or presenting a plan first.
- Treat implementation, modification, debugging, bug-fixing, refactoring, and verification requests as authorization to inspect, edit, run commands, and test the result immediately.
- When debugging reveals an in-scope defect, apply and verify the fix directly unless the user explicitly requested diagnosis or review only.
- Make reasonable, repository-aligned assumptions for unspecified implementation details and carry the task through editing, verification, and completion.
- Do not pause to ask whether to proceed, and do not ask for approval before routine local operations such as reading files, editing source, running builds, starting local development services, or performing non-destructive checks.
- Ask a question only when essential information cannot be discovered locally and making an assumption would create a material risk of data loss, an irreversible external side effect, or a result that clearly diverges from the request.
- Preserve unrelated user changes in a dirty worktree and work with overlapping edits rather than reverting them.

## Code Style and Scope

- Follow the existing Vue Single-File Component and Composition API patterns.
- Use two-space indentation, semicolons, and single quotes in JavaScript.
- Use lowercase kebab-case for CSS class names and descriptive PascalCase names for Vue components.
- Reuse the custom properties in `src/styles.css` before adding colors, spacing, shadows, or typography values.
- Keep responsive rules near the existing `900px` and `600px` breakpoints unless a new breakpoint is necessary.
- Put shared image references in `src/data/assets.js`; use lowercase, descriptive, hyphenated filenames in `assets/`.
- Preserve explicit image dimensions, useful `alt` text, lazy loading, and async decoding for content images.
- Avoid unrelated reformatting or broad component extraction. Add a component when it establishes a clear ownership boundary or removes meaningful duplication.
- Treat business facts as sensitive content. Do not invent or silently alter phone numbers, addresses, certification data, model compatibility, or material specifications.

## Internationalization Rules

- Keep the `zh`, `en`, `ja`, and `ko` objects in `i18n.js` synchronized whenever a translation key is added, renamed, or removed.
- Use the existing `t` function for translated interface content.
- Preserve the fallback behavior to Chinese for missing keys.
- Check `?lang=zh`, `?lang=en`, `?lang=ja`, and `?lang=ko`, as well as the `jianhai_language` value stored in `localStorage`.
- Preserve the initial-language priority: URL override, stored user choice, then browser detection. Detect `zh`, `ja`, and `ko` explicitly and default all other browser languages to English.
- When changing titles or descriptions, verify that the document title and description metadata update in all four languages.
- Keep the translated long-form company copy in the `about_body_*` dictionary keys rather than hard-coding language-specific paragraphs in `App.vue`.
- Content passed through `v-html` must remain trusted, repository-owned text. Do not pass user-controlled values to `v-html`.

## Build and Deployment Rules

- Run `npm run build` after source, dependency, asset, or deployment configuration changes.
- Verify that `dist/` contains `404.html`, `_headers`, `_redirects`, `robots.txt`, and `sitemap.xml` after building.
- Do not hand-edit hashed files or generated markup in `dist/`.
- Keep `assets/` references compatible with Vite's `new URL(..., import.meta.url)` asset handling.
- Update cache rules in `_headers` only when the resource behavior requires it.
- When the production domain or indexable URLs change, update both `robots.txt` and `sitemap.xml`.
- Call out changes to SEO, CSP/security headers, redirects, caching, or indexing in the handoff and pull request.

## Verification Guidelines

Every UI or content change requires browser verification at desktop and narrow mobile widths. Check:

- Chinese, English, Japanese, and Korean rendering
- Header scrolling state and anchor navigation
- Mobile menu open, close, and link behavior
- Language switching, URL overrides, and persistence after reload
- Product tables and engine cards at responsive widths
- Image loading and missing asset requests
- Contact links and displayed business information
- Direct hash navigation and the standalone 404 page
- Browser console errors and layout overflow or overlap

There is no coverage target, but verification depth should match the risk of the change. Capture before/after screenshots for visual pull requests.

## Commit and Pull Request Guidelines

Use short, imperative, focused commit messages.
Pull requests should include the user-visible summary, affected source or deployment files, verification performed, and a linked issue when available. Include screenshots for visual changes and explicitly mention any SEO, redirect, cache, security-header, or sitemap impact.
