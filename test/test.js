(function () {
  'use strict';

  var dpr = window.dpr;
  var mocha = window.mocha;
  var chai = window.chai;

  mocha.setup('bdd');
  chai.should();

  var describe = window.describe;
  var it = window.it;

  describe('dpr()', function () {
    it('should return a positive number', function () {
      var n = dpr();
      n.should.be.a('number');
      (n > 0).should.equal(true);
    });

    it('should equal `window.devicePixelRatio` if it is set and in ' +
        '`dpr.supported`', function () {
      var n2 = window.devicePixelRatio;
      if (n2 && ~dpr.supported.indexOf(n2)) dpr().should.equal(n2);
    });
  });

  describe('dpr(path)', function () {
    it('should add -1x if dpr() is 1', function () {
      var hold;
      hold = dpr.supported;
      dpr({
        supported: [1]
      });
      dpr('/my/image.jpg').should.equal('/my/image-1x.jpg');
      dpr({
        supported: hold
      });
    });

    it('should add -2x if on a MBP with retina display', function () {
      if (window.devicePixelRatio === 2) {
        dpr('/my/image.jpg').should.equal('/my/image-2x.jpg');
      }
    });
  });

  mocha.run();
})();
