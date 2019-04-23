/**
 * sails-hook-sentry hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineSailsHookSentryHook(sails) {

  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function() {
      // const Sentry = require('@sentry/node');
      // Sentry.init({ dsn: 'https://8777fe0fb1e24e9db7da38c8dfc07d48@sentry.io/1439651' });
      // Sentry.captureException(new Error("This is my fake error message!"));
      // sails.log.info('Initializing custom hook (`sails-hook-sentry`)');
      console.log('yolo')
    }

  };

};
