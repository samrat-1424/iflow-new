import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Set up permissions for public access to blog and solution APIs
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const permissions = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({
          where: {
            role: publicRole.id,
          },
        });

      const contentTypes = [
        'api::blog.blog',
        'api::solution.solution',
        'api::case-study.case-study',
      ];
      const actions = ['find', 'findOne'];

      for (const contentType of contentTypes) {
        for (const action of actions) {
          const permissionExists = permissions.find(
            (p) => p.action === `${contentType}.${action}`
          );

          if (!permissionExists) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action: `${contentType}.${action}`,
                role: publicRole.id,
                enabled: true,
              },
            });
          } else if (!permissionExists.enabled) {
            await strapi.query('plugin::users-permissions.permission').update({
              where: { id: permissionExists.id },
              data: { enabled: true },
            });
          }
        }
      }

      strapi.log.info('✅ Public permissions set for blog and solution APIs');
    }
  },
};
