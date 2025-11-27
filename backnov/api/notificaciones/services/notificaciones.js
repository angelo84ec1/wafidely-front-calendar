module.exports = {
  async sendEmailToUsers({ ids, subject, message, attachment, file }) {
    ids.forEach(async (id) => {
      const user = await strapi.query('user', 'users-permissions').findOne({ datos_personales: id });
      const email = user.datos_personales.correo;
      const alternativeMail = user.datos_personales.correo_alternativo;
      const nombres = user.datos_personales.nombres;
      const apellido = user.datos_personales.apellidos;
      const nombre_completo = `${nombres} ${apellido}`;
      const mailTo = email || alternativeMail;
      if (!mailTo) return;
      await strapi.plugins['email-designer'].services.email.sendTemplatedEmail(
        {
          to: email,
          attachments: [
            {
              filename: file.name,
              content: attachment,
            }
          ]
        },
        {
          templateId: 1,
          sourceCodeToTemplateId: 1,
          subject,
        },
        {
          USER: {
            firstname: nombre_completo
          },
          CONTENT: {
            message
          }
        }
      )
    })
  }
}