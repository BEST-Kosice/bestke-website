import type { Core } from '@strapi/strapi';

// CORS_ORIGINS env var: comma-separated list of allowed origins.
// Production (Plesk): CORS_ORIGINS=https://best.tuke.sk
// Local dev (unset):  defaults to localhost:5173 and localhost:4173
const getAllowedOrigins = (): string[] => {
  const raw = process.env.CORS_ORIGINS;
  if (raw) {
    return raw.split(',').map((o) => o.trim()).filter(Boolean);
  }
  return ['http://localhost:5173', 'http://localhost:4173'];
};

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'dl.airtable.com', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'dl.airtable.com', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: getAllowedOrigins(),
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
