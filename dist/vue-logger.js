/*!
 * vue-logger v0.0.3
 * https://github.com/Lluvio/vue-logger
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueLogger = factory());
}(this, (function () { 'use strict';

var vLogger = {};
vLogger.install = function (Vue, options) {
  if (vLogger.installed) return;
  var logger = {
    dev: true,
    prefix: '',
    shortname: true,
    levels: ['log', 'warn', 'debug', 'error', 'dir']
  };
  if (options) {
    for (var _iterator = Object.keys(options), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var key = _ref;

      if (key === 'levels') {
        logger[key] = logger[key].concat(options[key]);
      } else {
        logger[key] = options[key];
      }
    }
  }

  var _loop = function () {
    if (_isArray2) {
      if (_i2 >= _iterator2.length) return 'break';
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) return 'break';
      _ref2 = _i2.value;
    }

    var level = _ref2;

    logger[level] = function () {
      if (!logger.dev || typeof console === 'undefined') return;
      var args = Array.prototype.slice.apply(arguments);
      var prefix = typeof logger.prefix === 'function' ? logger.prefix() : logger.prefix;
      args.unshift(('[' + prefix + ' :: ' + level + ']').toUpperCase());
      console[level].apply(console, args);
    };
    if (logger.shortname) {
      Vue.prototype['$' + level] = logger[level];
    }
  };

  for (var _iterator2 = logger.levels, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    var _ret = _loop();

    if (_ret === 'break') break;
  }
  Vue.prototype.$console = logger;
  Vue.console = logger;
};

return vLogger;

})));
