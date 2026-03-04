import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('STRAPI_URL', 'http://localhost:1337'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: env.bool('IS_BEHIND_PROXY', false),
});

export default config;
