(function() {
  describe('Simple radio', function() {
    return it('should inherit from SimpleModule', function() {
      var radio;
      radio = simple.radio();
      return expect(radio instanceof SimpleModule).toBe(true);
    });
  });

}).call(this);
