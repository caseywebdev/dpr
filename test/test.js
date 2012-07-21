var should,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

mocha.setup('bdd');

should = chai.should();

describe('dpr()', function() {
  it('should return a positve number', function() {
    var n;
    (n = dpr()).should.be.a('number');
    return (n > 0).should.be["true"];
  });
  return it('should equal `window.devicePixelRatio` if it is set and in `dpr.supported`', function() {
    var n2;
    if ((n2 = window.devicePixelRatio) && __indexOf.call(dpr.supported, n2) >= 0) {
      return dpr().should.equal(n2);
    }
  });
});

describe('dpr(path)', function() {
  it('should add -1x if dpr() is 1', function() {
    var hold;
    hold = dpr.supported;
    dpr.supported = [1];
    dpr('/my/image.jpg').should.equal('/my/image-1x.jpg');
    return dpr.supported = hold;
  });
  return it('should add -2x if on a MBP with retina display', function() {
    if (window.devicePixelRatio === 2) {
      return dpr('/my/image.jpg').should.equal('/my/image-2x.jpg');
    }
  });
});

mocha.run();
