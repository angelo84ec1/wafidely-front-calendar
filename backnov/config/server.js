module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // url: 'https://api.pidolatam.com',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '4996880395b836b72998cf69937efb20'),
    },
  },
});
