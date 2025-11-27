'use strict';

/**
 * Auth.js controller
 *
 * @description: A set of functions called "actions" for managing `Auth`.
 */

/* eslint-disable no-useless-escape */
const crypto = require('crypto');
const _ = require('lodash');
const grant = require('grant-koa');
const { sanitizeEntity } = require('strapi-utils');

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const formatError = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

module.exports = {
  async callback(ctx) {
    try {
      const provider = ctx.params.provider || 'local';
      const params = ctx.request.body;

      const store = await strapi.store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
      });

      if (provider === 'local') {
        if (!_.get(await store.get({ key: 'grant' }), 'email.enabled')) {
          return ctx.badRequest(null, 'This provider is disabled.');
        }

        // The identifier is required.
        if (!params.identifier) {
          return ctx.badRequest(
            null,
            formatError({
              id: 'Auth.form.error.email.provide',
              message: 'Please provide your id document.',
            })
          );
        }

        // The password is required.
        if (!params.password) {
          return ctx.badRequest(
            null,
            formatError({
              id: 'Auth.form.error.password.provide',
              message: 'Please provide your password.',
            })
          );
        }

        // The documentType is required.
        if (!params.documentType) {
          return ctx.badRequest(
            null,
            formatError({
              id: 'Auth.form.error.password.provide',
              message: 'Please provide your document type.',
            })
          );
        }

        const query = { provider };

        if (params.documentType === 'pasaporte') {
          query['datos_personales.pasaporte'] = params.identifier;
        } else if (params.documentType === 'cedula') {
          query['datos_personales.cedula'] = params.identifier;
        } else if (params.documentType === 'ruc') {
          query['datos_personales.cedula_ruc'] = params.identifier;
        }

        // Set the identifier to the appropriate query field.
        // if (isEmail) {
        //   query.email = params.identifier.toLowerCase();
        // } else {
        //   query.username = params.identifier;
        // }

        // Check if the user exists.
        // const user = await strapi.query('user', 'users-permissions').findOne(query);
        //const user = await strapi.query('user', 'users-permissions').findOne(query, []);
        //const user = await strapi.query('user', 'users-permissions').findOne(query, [" role"]);
        const user = await strapi.query('user', 'users-permissions').findOne(query, ["role", "configuracion_pago"]);

        if (!user) {
          return ctx.badRequest(
            null,
            formatError({
              id: 'Auth.form.error.account.not-exist',
              message: 'Identifier or password invalid.',
            })
          );
        }

        if (
          _.get(await store.get({ key: 'advanced' }), 'email_confirmation') &&
          user.confirmed !== true
        ) {
          return ctx.badRequest(
            null,
            formatError({
              id: 'Auth.form.error.confirmed',
              message: 'Your account email is not confirmed',
            })
          );
        }

        if (user.blocked === true) {
          return ctx.badRequest(
            null,
            formatError({
              id: 'Auth.form.error.blocked',
              message: 'Your account has been blocked by an administrator',
            })
          );
        }

        // The user never authenticated with the `local` provider.
        if (!user.password) {
          return ctx.badRequest(
            null,
            formatError({
              id: 'Auth.form.error.password.local',
              message:
                'This user never set a local password, please login with the provider used during account creation.',
            })
          );
        }

        const validPassword = await strapi.plugins[
          'users-permissions'
        ].services.user.validatePassword(params.password, user.password);

        if (!validPassword) {
          return ctx.badRequest(
            null,
            formatError({
              id: 'Auth.form.error.invalid',
              message: 'Identifier or password invalid.',
            })
          );
        }

        const userSanitized = sanitizeEntity(user.toJSON ? user.toJSON() : user, {
          model: strapi.query('user', 'users-permissions').model,
        })

        const jwtToken = strapi.plugins['users-permissions'].services.jwt.issue({
          id: user.id,
        })

        ctx.cookies.set("token", jwtToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
          maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age
          domain: process.env.NODE_ENV === "development" ? "localhost" : process.env.PRODUCTION_URL,
        });

        ctx.send({
          jwt: jwtToken,
          user: userSanitized,
        });
      }
    }
    catch (error) {
      console.log(error)
    }
  },

  async resetPassword(ctx) {
    const params = _.assign({}, ctx.request.body, ctx.params);

    if (
      params.password &&
      params.passwordConfirmation &&
      params.password === params.passwordConfirmation &&
      params.code
    ) {
      const user = await strapi
        .query('user', 'users-permissions')
        .findOne({ resetPasswordToken: `${params.code}` });

      if (!user) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.code.provide',
            message: 'Incorrect code provided.',
          })
        );
      }

      const password = await strapi.plugins['users-permissions'].services.user.hashPassword({
        password: params.password,
      });

      // Update the user.
      await strapi
        .query('user', 'users-permissions')
        .update({ id: user.id }, { resetPasswordToken: null, password });

      ctx.send({
        jwt: strapi.plugins['users-permissions'].services.jwt.issue({
          id: user.id,
        }),
        user: sanitizeEntity(user.toJSON ? user.toJSON() : user, {
          model: strapi.query('user', 'users-permissions').model,
        }),
      });
    } else if (
      params.password &&
      params.passwordConfirmation &&
      params.password !== params.passwordConfirmation
    ) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.password.matching',
          message: 'Passwords do not match.',
        })
      );
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.params.provide',
          message: 'Incorrect params provided.',
        })
      );
    }
  },

  async connect(ctx, next) {
    const grantConfig = await strapi
      .store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'grant',
      })
      .get();

    const [requestPath] = ctx.request.url.split('?');
    const provider = requestPath.split('/')[2];

    if (!_.get(grantConfig[provider], 'enabled')) {
      return ctx.badRequest(null, 'This provider is disabled.');
    }

    if (!strapi.config.server.url.startsWith('http')) {
      strapi.log.warn(
        'You are using a third party provider for login. Make sure to set an absolute url in config/server.js. More info here: https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#setting-up-the-server-url'
      );
    }

    // Ability to pass OAuth callback dynamically
    grantConfig[provider].callback = _.get(ctx, 'query.callback') || grantConfig[provider].callback;
    grantConfig[provider].redirect_uri = strapi.plugins[
      'users-permissions'
    ].services.providers.buildRedirectUri(provider);

    return grant(grantConfig)(ctx, next);
  },

  async forgotPassword(ctx) {
    let { email } = ctx.request.body;

    // Check if the provided email is valid or not.
    const isEmail = emailRegExp.test(email);

    if (isEmail) {
      email = email.toLowerCase();
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.email.format',
          message: 'Please provide a valid email address.',
        })
      );
    }

    const pluginStore = await strapi.store({
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
    });

    // Find the user by email.
    const user = await strapi
      .query('user', 'users-permissions')
      .findOne({ email: email.toLowerCase() });

    // User not found.
    if (!user) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.user.not-exist',
          message: 'This email does not exist.',
        })
      );
    }

    // User blocked
    if (user.blocked) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.user.blocked',
          message: 'This user is disabled.',
        })
      );
    }

    // Generate random token.
    const resetPasswordToken = crypto.randomBytes(64).toString('hex');

    const settings = await pluginStore.get({ key: 'email' }).then(storeEmail => {
      try {
        return storeEmail['reset_password'].options;
      } catch (error) {
        return {};
      }
    });

    const advanced = await pluginStore.get({
      key: 'advanced',
    });

    const userInfo = sanitizeEntity(user, {
      model: strapi.query('user', 'users-permissions').model,
    });

    settings.message = await strapi.plugins['users-permissions'].services.userspermissions.template(
      settings.message,
      {
        URL: advanced.email_reset_password,
        USER: userInfo,
        TOKEN: resetPasswordToken,
      }
    );

    settings.object = await strapi.plugins['users-permissions'].services.userspermissions.template(
      settings.object,
      {
        USER: userInfo,
      }
    );

    try {
      // Send an email to the user.
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        from:
          settings.from.email || settings.from.name
            ? `${settings.from.name} <${settings.from.email}>`
            : undefined,
        replyTo: settings.response_email,
        subject: settings.object,
        text: settings.message,
        html: settings.message,
      });
    } catch (err) {
      return ctx.badRequest(null, err);
    }

    // Update the user.
    await strapi.query('user', 'users-permissions').update({ id: user.id }, { resetPasswordToken });

    ctx.send({ ok: true });
  },

  async register(ctx) {
    const pluginStore = await strapi.store({
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
    });

    const settings = await pluginStore.get({
      key: 'advanced',
    });

    if (!settings.allow_register) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.advanced.allow_register',
          message: 'Register action is currently disabled.',
        })
      );
    }

    const params = {
      ..._.omit(ctx.request.body, ['confirmed', 'confirmationToken', 'resetPasswordToken']),
      provider: 'local',
    };

    // Password is required.
    if (!params.password) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.password.provide',
          message: 'Please provide your password.',
        })
      );
    }

    // Email is required.
    if (!params.email) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.email.provide',
          message: 'Please provide your email.',
        })
      );
    }


    // Throw an error if the password selected by the user
    // contains more than three times the symbol '$'.
    if (strapi.plugins['users-permissions'].services.user.isHashed(params.password)) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.password.format',
          message: 'Your password cannot contain more than three times the symbol `$`.',
        })
      );
    }

    let role;
    if (params.role) {
      role = await strapi
        .query('role', 'users-permissions')
        .findOne({ name: params.role }, []);

      if (!role) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.role.notFound',
            message: 'Impossible to find the provided role.',
          })
        );
      }
    } else {
     role = await strapi
      .query('role', 'users-permissions')
      .findOne({ type: settings.default_role }, []);
    }

    if (!role) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.role.notFound',
          message: 'Impossible to find the default role.',
        })
      );
    }

    // Check if the provided email is valid or not.
    const isEmail = emailRegExp.test(params.email);

    if (isEmail) {
      params.email = params.email.toLowerCase();
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.email.format',
          message: 'Please provide valid email address.',
        })
      );
    }

    params.role = role.id;
    params.password = await strapi.plugins['users-permissions'].services.user.hashPassword(params);

    const user = await strapi.query('user', 'users-permissions').findOne({
      email: params.email,
    });

    if (user && user.provider === params.provider) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.email.taken',
          message: 'Email is already taken.',
        })
      );
    }

    if (user && user.provider !== params.provider && settings.unique_email) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.email.taken',
          message: 'Email is already taken.',
        })
      );
    }

    params.datos_personales = {};

    if (params.documentType === 'pasaporte') {
      params.datos_personales.pasaporte = parseInt(params.identifier);
    } else if (params.documentType === 'cedula') {
      params.datos_personales.cedula = parseInt(params.identifier);
    } else if (params.documentType === 'ruc') {
      params.datos_personales.cedula_ruc = parseInt(params.identifier);
    }

    params.datos_personales.establecimientos = params.establecimientos;
    params.datos_personales.correo = params.email;
    console.log(params.datos_personales);

    const datosPersonales = await strapi.query('datos-personales').create(params.datos_personales);

    // Add relation to datos-personales in user
    params.datos_personales = datosPersonales.id;

    params.username = params.identifier;

    params.confirmed = true;

    try {
      if (!settings.email_confirmation) {
        params.confirmed = true;
      }

      const user = await strapi.query('user', 'users-permissions').create(params);

      user.datos_personales = params.datos_personales
      const sanitizedUser = sanitizeEntity(user, {
        model: strapi.query('user', 'users-permissions').model,
      });

      const jwt = strapi.plugins['users-permissions'].services.jwt.issue(_.pick(user, ['id']));

      return ctx.send({
        jwt,
        user: sanitizedUser,
      });
    } catch (err) {
      const adminError = _.includes(err.message, 'username')
        ? {
          id: 'Auth.form.error.username.taken',
          message: 'Username already taken',
        }
        : { id: 'Auth.form.error.email.taken', message: 'Email already taken' };

      ctx.badRequest(null, formatError(adminError));
    }
  },

  async emailConfirmation(ctx, next, returnUser) {
    const { confirmation: confirmationToken } = ctx.query;

    const { user: userService, jwt: jwtService } = strapi.plugins['users-permissions'].services;

    if (_.isEmpty(confirmationToken)) {
      return ctx.badRequest('token.invalid');
    }

    const user = await userService.fetch({ confirmationToken }, []);

    if (!user) {
      return ctx.badRequest('token.invalid');
    }

    await userService.edit({ id: user.id }, { confirmed: true, confirmationToken: null });

    if (returnUser) {
      ctx.send({
        jwt: jwtService.issue({ id: user.id }),
        user: sanitizeEntity(user, {
          model: strapi.query('user', 'users-permissions').model,
        }),
      });
    } else {
      const settings = await strapi
        .store({
          environment: '',
          type: 'plugin',
          name: 'users-permissions',
          key: 'advanced',
        })
        .get();

      ctx.redirect(settings.email_confirmation_redirection || '/');
    }
  },

  async sendEmailConfirmation(ctx) {
    const params = _.assign(ctx.request.body);

    if (!params.email) {
      return ctx.badRequest('missing.email');
    }

    if (!params.identifier) {
      return ctx.badRequest('missing.identifier');
    }

    if (!params.password) {
      return ctx.badRequest('missing.password');
    }

    const isEmail = emailRegExp.test(params.email);

    if (isEmail) {
      params.email = params.email.toLowerCase();
    } else {
      return ctx.badRequest('wrong.email');
    }

    // const user = await strapi.query('user', 'users-permissions').findOne({
    //   email: params.email,
    // });

    // if (user.confirmed) {
    //   return ctx.badRequest('already.confirmed');
    // }

    // if (user.blocked) {
    //   return ctx.badRequest('blocked.user');
    // }

    try {
      console.log(params);
      const mail = await strapi
        .plugins['email-designer']
        .services.email
        .sendTemplatedEmail(
          {
            // required
            to: params.email,

            // optional if /config/plugins.js -> email.settings.defaultFrom is set
            // from: 'from@example.com',

            // optional if /config/plugins.js -> email.settings.defaultReplyTo is set
            // replyTo: 'reply@example.com',

            // optional array of files
            // attachments: [],
          },
          {
            // required - Ref ID defined in the template designer (won't change on import)
            // templateId: '65a7cead10af4c5cace964ce',
            templateId: 2,
            sourceCodeToTemplateId: 2,

            // If provided here will override the template's subject.
            // Can include variables like `Thank you for your order {{= USER.firstName }}!`
            // subject: `Thank you for your order`,
          },
          {
            // this object must include all variables you're using in your email template
            USER: {
              firstname: params.identifier,
            lastname: params.password
          }

          }
        );
        console.log(mail);
        return ctx.send({ mail });
    } catch (err) {
      console.log(err);
      return ctx.badRequest(null, err);
    }

  }
};
