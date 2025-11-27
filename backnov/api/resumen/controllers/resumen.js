'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async download(ctx) {
    const { user } = ctx.state;
    const document = await strapi.services.resumen.getResumenPDF(user.id);
    return document;
  },
  async sendEmail(ctx) {
    const { to, subject, pkg, price, user_name, password, confirm } = ctx.request.body;

    if (confirm) {
      const html = `<h1>Compraste con éxito${pkg} en $${price}</h>
      <br>
      <h3>detalles:</h3>
      <table border="1">
          <tr>
              <th>nombre de usuario</td>
              <th>contraseña</th>
              <th>Nombre</th>
              <th>Precio total</th>
          </tr>
          <tr>
              <td>${user_name}</td>
              <td>${password}</td>
              <td>${pkg}</td>
              <td>USD $${price}</td>
          </tr>
      </table>
      <br>
      <h4>Gracias</h4>`;

      try {
        await strapi.plugins['email'].services.email.send({
          to,
          subject,
          html,
        });
        ctx.send({ message: `Mail send to the ${to}` })
        return { success: true };
      } catch (error) {
        ctx.send({ message: error })
        return { success: false, error: error.message };
      }
    } else {
      console.log('starting send email');
      const { user } = ctx.state;
      console.log('user', user.id);
      const document = await strapi.services.resumen.getResumenPDF(user.id);
      console.log('export doc');
      await strapi.services.resumen.sendMail(user.id, document);
      ctx.send({ message: 'Email enviado' });

    }
  }


};
