import { Core } from '@strapi/strapi';
import path from 'path';
import fs from 'fs';

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: any) => {
    await next();

    // Only handle if it's a 404, the request uses GET, and doesn't start with /api or /admin
    if (
      ctx.status === 404 &&
      ctx.method === 'GET' &&
      !ctx.path.startsWith('/api') &&
      !ctx.path.startsWith('/admin') &&
      !ctx.path.startsWith('/uploads')
    ) {
      const indexPath = path.resolve(strapi.dirs.static.public, 'index.html');
      
      if (fs.existsSync(indexPath)) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(indexPath);
      }
    }
  };
};
