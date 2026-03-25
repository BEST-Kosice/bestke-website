'use strict';

/**
 * Startup file for Plesk Node.js Extension.
 * Plesk runs: node app.js
 *
 * This file starts Strapi 5 programmatically using the compiled TypeScript
 * output in the `dist/` directory (produced by `npm run build`).
 *
 * Required env vars on the server:
 *   NODE_ENV=production
 *   PORT=<port assigned by Plesk>
 *   HOST=0.0.0.0
 *   APP_KEYS, ADMIN_JWT_SECRET, API_TOKEN_SALT, TRANSFER_TOKEN_SALT, ENCRYPTION_KEY
 *   DATABASE_CLIENT=postgres
 *   DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD
 *   STRAPI_URL=https://api.best.tuke.sk
 *   CORS_ORIGINS=https://best.tuke.sk
 */

const path = require('path');

async function main() {
    const { createStrapi } = require('@strapi/strapi');

    const app = await createStrapi({
        distDir: path.join(__dirname, 'dist'),
    });

    await app.start();
}

main().catch((err) => {
    console.error('Strapi failed to start:', err);
    process.exit(1);
});
