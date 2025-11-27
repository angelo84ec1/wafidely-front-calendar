const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    send: async (ctx) => {
        const { to, subject, text } = ctx.request.body;

        try {
            const result = await strapi.services.email.send(to, subject, text);
            return ctx.send(result);
        } catch (error) {
            return ctx.send({ error: 'Failed to send email.' });
        }
    },
};
