# Copilot instructions for BEST Košice Website

## Repository overview

This repository contains the official BEST Košice website:

- `frontend/` is a React 19 single-page application built with Vite 7, React Router 7, Tailwind CSS 4, and `lucide-react`.
- `backend/` is a Strapi 5 headless CMS backed by PostgreSQL.
- `docker-compose.yml` runs PostgreSQL, Strapi, and the Vite frontend together for local development.

Content for news and events is managed in Strapi. Do not hard-code CMS content into frontend components unless the content is intentionally static.

## Important project conventions

- Preserve the existing JavaScript/JSX style in `frontend/`: functional React components, ES modules, double-quoted imports/strings, and semicolons.
- Keep routes in `frontend/src/App.jsx` and page-level compositions in `frontend/src/pages/`.
- Put reusable visual sections in `frontend/src/components/`.
- Keep Strapi API calls in `frontend/src/services/api.js`; reuse its URL and media helpers rather than duplicating fetch logic.
- Use `useLanguage()` and `frontend/src/i18n/translations.js` for UI copy. Supported UI languages are `EN`, `SK`, and `UA`.
- Use the existing Tailwind theme and design language documented in `DESIGN.md`; do not introduce a new color system, typography system, or component library without a clear requirement.
- Use `lucide-react` for interface icons instead of adding ad-hoc SVG icon markup.
- Keep public API reads compatible with Strapi REST query parameters and preserve existing sorting, filtering, population, and pagination behavior.
- For backend lifecycle changes, follow Strapi conventions in `backend/src/index.ts` and keep initialization idempotent.
- Avoid `any` in new TypeScript backend code. Add explicit types or use the types exposed by Strapi where practical.

## Environment and secrets

- Never commit `.env` files, production credentials, API tokens, or real Strapi secrets.
- Use `backend/.env.example` and `frontend/.env.example` as configuration templates.
- The values in `docker-compose.yml` are local-development placeholders only.
- Frontend API access is configured through `VITE_STRAPI_URL`; it defaults to `http://localhost:1337`.

## Running and validating changes

### Docker workflow

Use Docker Compose for the complete local stack:

```bash
docker compose up
```

Rebuild after dependency or Dockerfile changes:

```bash
docker compose up --build
```

The services are available at:

- Frontend: `http://localhost:5173`
- Strapi API/admin: `http://localhost:1337`
- PostgreSQL host port: `5433`

### Direct workflow

Frontend commands are run from `frontend/`:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Backend commands are run from `backend/`:

```bash
npm install
npm run develop
npm run build
npm run start
```

There is no root `package.json` in the current repository, so do not invent root-level npm scripts. When changing frontend code, at minimum run `npm run build` from `frontend/`. When changing backend code or configuration, run the narrowest applicable Strapi build or startup check.

## Change guidance

- Make focused changes and preserve existing behavior outside the requested scope.
- When adding a route, update the route table in `frontend/src/App.jsx` and verify the corresponding page and navigation links.
- When adding CMS-backed content, update the API service, loading/error/empty states, and translations as appropriate.
- Handle failed network requests explicitly; do not silently replace errors with success-shaped fallback data.
- Check responsive behavior and accessibility for UI changes, including semantic headings, keyboard operation, visible focus states, useful image alt text, and sufficient color contrast.
- Do not edit generated build output, dependency directories, Strapi uploads, or local diagnostic artifacts.
- Update `README.md` when development setup, commands, ports, or architecture change.

## Before finishing a change

1. Inspect the relevant existing components, services, translations, and styles before introducing new patterns.
2. Run the smallest relevant validation command, normally `npm run build` in `frontend/` for frontend changes.
3. Report validation failures clearly rather than hiding them or weakening the check.
