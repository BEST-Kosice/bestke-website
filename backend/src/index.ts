import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * Grants public read access to the Article API so the
   * frontend can fetch news without authentication.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Find the public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    // Check if article permissions already exist
    const existingPerms = await strapi
      .query('plugin::users-permissions.permission')
      .findMany({
        where: {
          role: publicRole.id,
          action: {
            $in: [
              'api::article.article.find',
              'api::article.article.findOne',
            ],
          },
        },
      });

    const existingActions = existingPerms.map((p: any) => p.action);

    // Create missing permissions
    for (const action of [
      'api::article.article.find',
      'api::article.article.findOne',
    ]) {
      if (!existingActions.includes(action)) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: publicRole.id,
          },
        });
        strapi.log.info(`[bootstrap] Granted public permission: ${action}`);
      }
    }
  },
};
