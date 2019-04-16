/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  // middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/
  //  checkSentry: (function sentry(){
  //     console.log('i am hit')
  //     const Sentry = require('@sentry/node');
  //     return Sentry.init({ dsn: 'https://9fb2cd86abec4320a5dd74a0d9bf4c59@sentry.io/1284380' });
  //   })(),

  //   testing: (function test(){
  //     Sentry.captureException(new Error("This is my fake error message"));
  //   })(),

  //   order: [
  //     'checkSentry',
  //     'testing',
  //     'cookieParser',
  //     'session',
  //     'bodyParser',
  //     'compress',
  //     'poweredBy',
  //     'router',
  //     'www',
  //     'favicon',
  //   ],


    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })()

  // }
};
