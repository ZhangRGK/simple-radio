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

  Radio.prototype._tpl = "<div class=\"simple-radio\">\n    <div class=\"dot\"></div>\n</div>";

  Radio.prototype._init = function() {
    this.radio = $(this.opts.el).first();
    if (this.radio.length === 0) {
      throw new Error("simple-radio: el option is invalid");
    }
    this.size = 32;
    if (this.opts.size) {
      this.size = this.opts.size;
    } else if (this.radio.data("size")) {
      this.size = this.radio.data("size");
    }
    return this._render();
  };

  Radio.prototype._render = function() {
    this.radio.hide();
    this.el = $(this._tpl).insertAfter(this.radio);
    this.el.css({
      "height": this.size,
      "width": this.size * 1.6,
      "border-radius": this.size
    });
    this.state = this.radio.attr("value") && !!this.radio.attr("value") ? "on" : "off";
    this.toggle(this.state);
    this.disabled = this.radio.prop("disabled");
    this.disable(this.disabled);
    return this._bind();
  };

  Radio.prototype._bind = function() {
    return this.el.on("click", (function(_this) {
      return function(event) {
        event.stopPropagation();
        return _this.toggle(_this.state === "on" ? "off" : "on");
      };
    })(this));
  };

  Radio.prototype.disable = function(is_disable) {
    if (is_disable) {
      this.disabled = true;
      return this.el.addClass("disabled");
    } else {
      this.disabled = false;
      return this.el.removeClass("disabled");
    }
  };

  Radio.prototype.toggle = function(state) {
    if (this.disabled) {
      return;
    }
    this.state = state;
    if (this.state === "on") {
      this.el.addClass("on");
      return this.radio.attr("value", "on");
    } else {
      this.el.removeClass("on");
      return this.radio.attr("value", "off");
    }
  };

  Radio.prototype.destroy = function() {
    this.radio.show();
    return this.el.remove();
  };

  return Radio;

})(SimpleModule);

radio = function(opts) {
  return new Radio(opts);
};

return radio;

}));
