const { toBase64 } = require('../../../utils/fileToBase64');
module.exports = {
  async enviar(ctx) {
    try {
      const { users, subject, message } = ctx.request.body;
      const file = ctx.request.files['attachment'];
      let parsedUsers = typeof users === 'string' ? JSON.parse(users) : users;      
      const attachment = await toBase64(file);      
      await strapi.services.notificaciones.sendEmailToUsers({ ids: parsedUsers, subject, message, attachment, file });
      return ctx.send({
        message: 'ok'
      })
    } catch (err) {
      console.error(err);
      strapi.log.debug('📺: ', err);
      return ctx.response.badImplementation('terrible implementation');
    }
  }
}