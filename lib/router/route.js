
/**
 * Module dependencies.
 */

var utils = require('../utils');
var cores = require('../extends/cores');

/**
 * Expose `Route`.
 */

module.exports = Route;

/**
 * Initialize `Route` with the given HTTP `method`, `path`,
 * and an array of `callbacks` and `options`.
 *
 * Options:
 *
 *   - `sensitive`    enable case-sensitive routes
 *   - `strict`       enable strict matching for trailing slashes
 *
 * @param {String} method
 * @param {String} path
 * @param {Array} callbacks
 * @param {Object} options.
 * @api private
 */

function Route(method, path, callbacks, options) {
  options = options || {};
  this.path = path;
  this.name = options.name;
  this.constrains = options.constrains || {};
  this.method = method;
  this.callbacks = callbacks;
  this.regexp = utils.pathRegexp(path
    , this.keys = []
    , options.sensitive
    , options.strict);
}

/**
 * Check if this route matches `path`, if so
 * populate `.params`.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */

Route.prototype.match = function(path, options){
  var keys = this.keys
    , params = this.params = [];

  var options = options || {};

  for(var key in this.constrains) {
    var value = options[key];
    var constrain = this.constrains[key];
    var constrainType = Object.prototype.toString.call(constrain).match(/^\[object\s(.*)\]$/)[1];

    switch(constrainType) {
    case 'Array':
      if(constrain.indexOf(value) == -1) {
        return false;
      }
    break;
    case 'RegExp':
      if(!constrain.test(value)) {
        return false;
      }
    break;
    default:
      if(constrain != options[key]) {
        return false;
      }
    break;
    }
  }

  var m = this.regexp.exec(path);

  if (!m) return false;

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1];

    var val = 'string' == typeof m[i]
      ? utils.decode(m[i])
      : m[i];

    if (key) {
      params[key.name] = val;
    } else {
      params.push(val);
    }
  }

  return true;
};
