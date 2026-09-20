# BEST Košice Website

Official website of **BEST Košice**

## Tech Stack

**Frontend** (`/frontend`)

- React 19 + Vite 7
- React Router 7
- Tailwind CSS 4
- Served in production via a small Express server (`server.cjs`)

**Backend** (`/backend`)

- Strapi 5 (headless CMS)
- PostgreSQL

**Infrastructure**

- Docker Compose for local development
- Hosted on Plesk (`best.tuke.sk` for the frontend, `api.best.tuke.sk` for the Strapi backend)

## Capabilities

- Content-driven pages (News, Articles, Events, About Us) managed entirely through the Strapi admin panel — no code changes needed to publish content.
- Slovak and Ukrainan languages UI with i18n support (`frontend/src/i18n`).
- Media uploads handled by Strapi and persisted independently of deploys.

## Local Development with Docker

The project runs fully containerized for local development — no local Node/PostgreSQL installation required.

**Prerequisites:** Docker and Docker Compose.

1. Clone the repository:

   ```bash
   git clone https://github.com/kitnew/bestke-website.git
   cd bestke-website
   ```

2. Start everything (PostgreSQL, Strapi backend, React frontend):

   ```bash
   docker compose up
   ```

3. Once containers are up:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend / Strapi API: [http://localhost:1337](http://localhost:1337)
   - Strapi admin panel: [http://localhost:1337/admin](http://localhost:1337/admin)

Source code for both `frontend/src` and `backend/src` (and `backend/config`) is mounted into the containers as volumes, so code changes are picked up live without rebuilding images. Rebuild only when dependencies (`package.json`) change:

```bash
docker compose up --build
```

> The credentials and secrets in `docker-compose.yml` are local-development-only placeholders (`CHANGE_ME`, `strapi`/`strapi`). They must never be reused in production.

## Local Development without Docker

You can also run the frontend and backend directly on your machine.

**Prerequisites:**

- Node.js ≥ 20 and npm
- A PostgreSQL instance (local install, or any reachable Postgres database)

1. Clone the repository and install dependencies for both workspaces:

   ```bash
   git clone https://github.com/kitnew/bestke-website.git
   cd bestke-website
   npm run install:all
   ```

2. Configure the backend environment. Copy `backend/.env.example` to `backend/.env` and fill in your local PostgreSQL connection details and Strapi secrets (see [Environment Variables](#environment-variables) below):

   ```bash
   cp backend/.env.example backend/.env
   ```

3. Start the backend (Strapi), in one terminal from the repo root:

   ```bash
   npm run dev:backend
   ```

   Strapi will be available at [http://localhost:1337](http://localhost:1337), admin panel at [http://localhost:1337/admin](http://localhost:1337/admin).

4. Start the frontend, in a second terminal from the repo root:
   ```bash
   npm run dev:frontend
   ```
   The frontend will be available at [http://localhost:5173](http://localhost:5173).

You can also run just one side (e.g. only `dev:frontend`) if you only need to work on that part and point it at an already-running backend.

## Deployment (Plesk)

The site is hosted on Plesk and deploys straight from the `main` branch of this repository — there is no separate build/release pipeline.

- **`best.tuke.sk`** and **`api.best.tuke.sk`** are each connected to this same GitHub repo as an independent Git Deployment in Plesk (one for the frontend, one for the backend).
- A GitHub webhook notifies Plesk on every push to `main`. Plesk then runs `git pull` in each site's repo directory followed by its configured deploy actions:
  - **Frontend**: `npm ci` → `vite build` → copy `dist/` into the site's `httpdocs/`.
  - **Backend**: `npm ci --omit=dev` → `strapi build`. The Node.js app must be **restarted manually** in Plesk after each backend deploy — Plesk does not do this automatically.
- Uploaded media (`backend/public/uploads/`) is excluded from git and is never touched by `git pull`, so it survives every deploy.
- `best.tuke.sk/admin` redirects to `api.best.tuke.sk/admin`, where the actual Strapi admin panel is served.

Full step-by-step setup instructions (database, environment variables, Nginx rules, troubleshooting) are documented in [`DEPLOY_PLESK.md`](./DEPLOY_PLESK.md).

## Environment Variables

The backend requires a `.env` file for Strapi secrets and database connection details. See [`DEPLOY_PLESK.md`](./DEPLOY_PLESK.md) (section 5) for the full list of required variables and how to generate secrets. For local Docker development, the required variables are already set in `docker-compose.yml`.
