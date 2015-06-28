(function() {
  describe("Simple radio", function() {
    var opts;
    opts = {
      el: "#radio"
    };
    beforeEach(function() {
      return $("<input id='radio' type='radio'>").appendTo("body");
    });
    afterEach(function() {
      $("#radio").remove();
      return $(".simple-radio").remove();
    });
    it("should inherit from SimpleModule", function() {
      var radio;
      radio = simple.radio(opts);
      return expect(radio instanceof SimpleModule).toBe(true);
    });
    it("should throw Error when opts is invalid", function() {
      var radio;
      radio = simple.radio;
      return expect(radio).toThrowError("simple-radio: el option is invalid");
    });
    it("should render element when init", function() {
      var radio;
      radio = simple.radio(opts);
      expect($("div.simple-radio")).toExist();
      expect($(".simple-radio>.dot")).toExist();
      return expect($("#radio").css("display")).toBe("none");
    });
    it("should set el size by opts", function() {
      var new_opts, radio;
      new_opts = {
        el: opts.el,
        size: 60
      };
      radio = simple.radio(new_opts);
      expect($("div.simple-radio").css("height")).toBe(60 + "px");
      return expect($("div.simple-radio").css("width")).toBe(60 * 1.6 + "px");
    });
    it("should set el size by prop", function() {
      var radio;
      $("#radio").data("size", 60);
      radio = simple.radio(opts);
      expect($("div.simple-radio").css("height")).toBe(60 + "px");
      return expect($("div.simple-radio").css("width")).toBe(60 * 1.6 + "px");
    });
    it("should set default size when opts.size and data-size are invalid", function() {
      var radio;
      radio = simple.radio(opts);
      return expect(radio.size).toBe(32);
    });
    it("should init class and value when render", function() {
      var $radio, $simple_radio, radio;
      $radio = $("#radio");
      $radio.attr("value", "on");
      radio = simple.radio(opts);
      $simple_radio = $("div.simple-radio");
      expect($radio.val()).toBe("on");
      return expect($simple_radio).toHaveClass('on');
    });
    it("should change class and value when function toggle invoke", function() {
      var $radio, $simple_radio, radio;
      radio = simple.radio(opts);
      $radio = $("#radio");
      $simple_radio = $("div.simple-radio");
      radio.toggle("on");
      expect($radio.val()).toBe("on");
      return expect($simple_radio).toHaveClass('on');
    });
    it("should disabled the el when the input disabled", function() {
      var $radio, $simple_radio, before_value, radio;
      $radio = $("#radio");
      $radio.attr("disabled", "disabled");
      radio = simple.radio(opts);
      $simple_radio = $("div.simple-radio");
      expect($simple_radio).toHaveClass('disabled');
      expect(radio.disabled).toBe(true);
      before_value = $radio.val();
      radio.toggle(before_value === "on" ? "off" : "on");
      return expect(before_value).toBe($radio.val());
    });
    it("should diabled the el when function disable invoke with true", function() {
      var $radio, $simple_radio, before_value, radio;
      $radio = $("#radio");
      radio = simple.radio(opts);
      $simple_radio = $("div.simple-radio");
      radio.disable(true);
      expect($simple_radio).toHaveClass('disabled');
      expect(radio.disabled).toBe(true);
      before_value = $radio.val();
      radio.toggle(before_value === "on" ? "off" : "on");
      return expect(before_value).toBe($radio.val());
    });
    it("should recovery the el when function disable invoke with false", function() {
      var $radio, $simple_radio, after_value, before_value, radio;
      $radio = $("#radio");
      $radio.attr("disabled", "disabled");
      radio = simple.radio(opts);
      $simple_radio = $("div.simple-radio");
      radio.disable(false);
      expect($simple_radio).not.toHaveClass('disabled');
      expect(radio.disabled).toBe(false);
      before_value = $radio.val();
      after_value = before_value === "on" ? "off" : "on";
      radio.toggle(after_value);
      return expect($radio.val()).toBe(after_value);
    });
    it("should toggle value and class on click", function() {
      var $radio, $simple_radio, radio;
      $radio = $("#radio");
      radio = simple.radio(opts);
      $simple_radio = $("div.simple-radio");
      $simple_radio.trigger('click');
      expect($radio.val()).toBe("on");
      return expect($simple_radio).toHaveClass("on");
    });
    it("should ignore event when el is disabled", function() {
      var $radio, $simple_radio, radio;
      $radio = $("#radio");
      $radio.attr("disabled", "disabled");
      radio = simple.radio(opts);
      $simple_radio = $("div.simple-radio");
      $simple_radio.trigger("click");
      expect($radio.val()).toBe("off");
      return expect($simple_radio).not.toHaveClass("on");
    });
    return it("should destroy when function destroy invoke", function() {
      var display, radio;
      display = $("#radio").css("display");
      radio = simple.radio(opts);
      radio.destroy();
      expect($("div.simple-radio")).not.toExist();
      return expect($("#radio").css("display")).toBe(display);
    });
  });

}).call(this);
