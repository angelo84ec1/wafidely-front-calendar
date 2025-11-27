module.exports = {
    apps: [
        {
            name: "strapi amc_app",
            script: "./server.js",
            env_production: {
                NODE_ENV: "production"
            },
            env_development: {
                NODE_ENV: "development"
            },
        },

    ]
}