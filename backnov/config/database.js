module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    //   default: {
    //     connector: 'bookshelf',
    //     settings: {
    //       client: 'postgres',
    //       host: env('DATABASE_HOST', 'localhost'),
    //       port: env.int('DATABASE_PORT', 5432),
    //       database: env('DATABASE_NAME', 'strapi'),
    //       username: env('DATABASE_USERNAME', 'strapi'),
    //       password: env('DATABASE_PASSWORD', 'strapi'),
    //       schema: env('DATABASE_SCHEMA', 'public'), // Not Required
    //       ssl: false,
    //     },
    //     options: {},
    // },
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', 'dbwimtut.47du3sb.mongodb.net'),
        srv: env.bool('DATABASE_SRV', true),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', 'strapi-appwimtut'),
        username: env('DATABASE_USERNAME', 'websecuadornet'),
        password: env('DATABASE_PASSWORD', 'A3wRqKA9qRtZRCiv'),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        ssl: env.bool('DATABASE_SSL', true),
      },
    },
  },
});
