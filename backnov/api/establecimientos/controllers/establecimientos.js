'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Buscar establecimiento por slug personalizado
   * GET /establecimientos/by-slug/:slug
   */
  async findBySlug(ctx) {
    try {
      const { slug } = ctx.params;

      // Validar que el slug no esté vacío
      if (!slug || slug.trim() === '') {
        return ctx.badRequest('El slug es requerido');
      }

      // Buscar el establecimiento por urlbusiness
      const entity = await strapi.query('establecimientos').findOne({
        urlbusiness: slug,
      });

      if (!entity) {
        return ctx.notFound('Establecimiento no encontrado');
      }

      // Sanitizar la respuesta (remover campos privados)
      return sanitizeEntity(entity, { model: strapi.models.establecimientos });

    } catch (error) {
      console.error('Error en findBySlug:', error);
      return ctx.badRequest('Error al buscar el establecimiento');
    }
  },

  /**
   * Verificar disponibilidad de un slug
   * GET /establecimientos/check-slug/:slug
   */
  async checkSlug(ctx) {
    try {
      const { slug } = ctx.params;

      // Validar que el slug no esté vacío
      if (!slug || slug.trim() === '') {
        return ctx.badRequest('El slug es requerido');
      }

      // Obtener el ID del usuario autenticado (si existe)
      const userId = ctx.state.user?.id;

      // Buscar si existe algún establecimiento con este slug
      const existingEstablishment = await strapi.query('establecimientos').findOne({
        urlbusiness: slug,
      });

      // Si no existe ningún establecimiento con este slug
      if (!existingEstablishment) {
        return ctx.send({
          available: true,
          message: 'El slug está disponible',
        });
      }

      // Si existe, verificar si pertenece al usuario actual
      if (userId && existingEstablishment.user?.id === userId) {
        return ctx.send({
          available: true,
          message: 'Este slug es tuyo',
          establishmentId: existingEstablishment.id,
        });
      }

      // El slug está ocupado por otro usuario
      return ctx.send({
        available: false,
        message: 'Este slug ya está en uso',
        establishmentId: existingEstablishment.id,
      });

    } catch (error) {
      console.error('Error en checkSlug:', error);
      return ctx.badRequest('Error al verificar disponibilidad del slug');
    }
  },

  /**
   * Sobrescribir el método update para validar slug antes de guardar
   * PUT /establecimientos/:id
   */
  async update(ctx) {
    const { id } = ctx.params;
    const { urlbusiness } = ctx.request.body;

    try {
      // Si se está actualizando el urlbusiness, validar y limpiar
      if (urlbusiness !== undefined && urlbusiness !== null) {
        // Limpiar el slug
        const cleanSlug = sanitizeSlug(urlbusiness);

        // Si el slug limpio está vacío, permitir null
        if (cleanSlug === '') {
          ctx.request.body.urlbusiness = null;
        } else {
          // Verificar que tenga longitud válida
          if (cleanSlug.length < 3) {
            return ctx.badRequest('El slug debe tener al menos 3 caracteres');
          }

          if (cleanSlug.length > 50) {
            return ctx.badRequest('El slug no puede tener más de 50 caracteres');
          }

          // Verificar que no exista otro establecimiento con este slug
          const existing = await strapi.query('establecimientos').findOne({
            urlbusiness: cleanSlug,
            id_ne: id, // Excluir el establecimiento actual
          });

          if (existing) {
            return ctx.badRequest('Este slug ya está en uso');
          }

          // Actualizar con el slug limpio
          ctx.request.body.urlbusiness = cleanSlug;
        }
      }

      // Ejecutar el update normal de Strapi
      let entity = await strapi.services.establecimientos.update(
        { id },
        ctx.request.body
      );

      return sanitizeEntity(entity, { model: strapi.models.establecimientos });

    } catch (error) {
      console.error('Error en update:', error);
      return ctx.badRequest('Error al actualizar el establecimiento');
    }
  },
};

/**
 * Función helper para limpiar slugs
 * Convierte texto a formato URL-friendly
 */
function sanitizeSlug(text) {
  if (!text) return '';

  return text
    .toLowerCase()
    .trim()
    // Reemplazar acentos
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    // Eliminar caracteres especiales
    .replace(/[^a-z0-9\s-]/g, '')
    // Reemplazar espacios con guiones
    .replace(/\s+/g, '-')
    // Eliminar guiones múltiples
    .replace(/-+/g, '-')
    // Eliminar guiones al inicio y final
    .replace(/^-|-$/g, '');
}
