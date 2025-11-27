module.exports = {
    send: async (to, subject, text) => {
        try {
            await strapi.plugins['email'].services.email.send({
                to,
                subject,
                text,
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
};