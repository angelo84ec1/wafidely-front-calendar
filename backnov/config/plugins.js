module.exports = ({env}) => ({
  graphql: {
    endpoint: "/graphql",
    shadowCRUD: true,
    playgroundAlways: false,
    depthLimit: 7,
    amountLimit: 100,
    apolloServer: {
      tracing: false,
    },
  },

  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024 // 256mb in bytes
    }
  },




  email: {
    provider: "amazon-ses", // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
    providerOptions: {
      key: "",
      secret: "",
      amazon: "",
    },
    settings: {
      defaultFrom: "salesai@wappiad.com",
      defaultReplyTo: "salesai@wappiad.com",
     
    },
  },
'email-designer': {
    enabled: true,
  }
});

