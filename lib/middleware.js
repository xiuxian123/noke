
/**
 * Module dependencies.
 */

var utils = require('./utils');

/**
 * Initialization middleware, exposing the
 * request and response to eachother, as well
 * as defaulting the X-Powered-By header field.
 *
 * @param {Function} app
 * @return {Function}
 * @api private
 */

exports.init = function(app){
  return function nokeInit(req, res, next){
    if (app.enabled('x-powered-by')) res.setHeader('X-Powered-By', 'Nginx');
    req.res = res;
    res.req = req;
    req.next = next;

    req.__proto__ = app.request;
    res.__proto__ = app.response;

    res.locals = res.locals || utils.locals(res);

    next();
  }
};
