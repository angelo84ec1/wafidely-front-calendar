'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve authenticated user con relaciones
   * GET /users/me
   */
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: 'No authorization header was found' }] }
      ]);
    }

    console.log('📍 /users/me llamado para user ID:', user.id);

    try {
      // Popular 'establecimiento' (singular) - relación del User
      const userWithRelations = await strapi
        .query('user', 'users-permissions')
        .findOne(
          { id: user.id },
          ['establecimiento', 'role', 'datos_personales']
        );

      console.log('✅ Usuario obtenido con relaciones');
      console.log('🏢 Establecimiento:', userWithRelations.establecimiento?.id || 'ninguno');
      console.log('🏢 Establecimiento nombre:', userWithRelations.establecimiento?.nombre || 'ninguno');
      console.log('🎭 Role:', userWithRelations.role?.name);

      const sanitizedUser = sanitizeEntity(userWithRelations, {
        model: strapi.query('user', 'users-permissions').model,
      });

      ctx.body = sanitizedUser;
    } catch (error) {
      console.error('❌ Error en /users/me:', error);
      ctx.throw(500, 'Error al obtener usuario');
    }
  },
};