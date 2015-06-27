(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simple-radio', ["jquery","simple-module"], function (a0,b1) {
      return (root['radio'] = factory(a0,b1));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simple-module"));
  } else {
    root.simple = root.simple || {};
    root.simple['radio'] = factory(jQuery,SimpleModule);
  }
}(this, function ($, SimpleModule) {

var Radio, radio,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Radio = (function(superClass) {
  extend(Radio, superClass);

  function Radio() {
    return Radio.__super__.constructor.apply(this, arguments);
  }

  Radio.prototype._tpl = '<div class="simple-radio">\n    <input type="radio" name="radio_demo" value="0"/>\n    <input type="radio" name="radio_demo" value="1"/>\n    <div class="dot"></div>\n</div>';

  Radio.prototype._init = function() {};

  return Radio;

})(SimpleModule);

radio = function(opts) {
  return new Radio(opts);
};

return radio;

}));
