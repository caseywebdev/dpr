mocha.setup 'bdd'
should = chai.should()

describe 'dpr()', ->

  it 'should return a positve number', ->
    (n = dpr()).should.be.a 'number'
    (n > 0).should.be.true

  it 'should equal `window.devicePixelRatio` if it is set and in `dpr.supported`', ->
    if (n2 = window.devicePixelRatio) and n2 in dpr.supported
      dpr().should.equal n2

describe 'dpr(path)', ->

  it 'should add -1x if dpr() is 1', ->
    hold = dpr.supported
    dpr supported: [1]
    dpr('/my/image.jpg').should.equal '/my/image-1x.jpg'
    dpr supported: hold

  it 'should add -2x if on a MBP with retina display', ->
    if window.devicePixelRatio is 2
      dpr('/my/image.jpg').should.equal '/my/image-2x.jpg'

mocha.run()
