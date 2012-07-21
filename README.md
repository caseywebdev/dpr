dpr
===

Trying to make life easier in a world with too many **d**evice **p**ixel
**r**atios.

Installation
------------

```javascript
<script src='https://raw.github.com/caseywebdev/dpr/tree/master/dpr.js'></script>
```

or download `dpr.js` and reference your own copy.

Usage
-----

First, you'll want to configure dpr to your needs before you do anything. The
defaults are shown and should work for most cases. Opinions will differ on the
formatting and whether DPR of 1 should be formatted or not, so feel free to
change those.

```coffeescript
dpr.configure

  # These are the ratios we have images for. Sort ASC (i.e. [1, 1.5, 2])
  supported: [1, 2]

  # Specify a default for when the DPR cannot be determined. I assume 1 for
  # now, but maybe assume 2 in a couple years, when bandwidth/average DPR
  # increases, but for now be conservative.
  default: 1

  format:

    # What part of the file do we want to replace?
    match: /(\..*)/

    # How should filename alterations be formatted? (# is the dpr)
    replace: '-#x$1'

    # Should filenames with DPR of 1 be formatted?
    one: true
```

`dpr.configure is just a convenience method. All of the properties can be
`accessed directly via dpr[propertyName] or extended like _.extend dpr,
`options or $.extend dpr, options

Once you're all set up, you can do cool stuff like...

```coffeescript
# Get the device pixel ratio!
dpr()

# Get a filename adjusted to the current device pixel ratio!
dpr('/my/file/path.jpg') # -> '/my/file/path-2x.jpg' on a retina display

# I like this trick for CSS
$ -> $('html').addClass "dpr-#{dpr()}"
```

More to come!

Licence
-------

Copyright (C) 2012 Casey Foster <casey@caseywebdev.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

