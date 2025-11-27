module.exports = {
  apps: [
    {
      name: "nuxt wafidely-app",
      script: './.output/server/index.mjs',
      env_production: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      }
    }
  ]
}
