(function (root, factory) {
  if (typeof root.define === 'function' && root.define.amd) {
    root.define('dpr', ['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    root.dpr = factory(root.jQuery);
  }
})(this, function ($) {
  'use strict';

  // Define the namespace
  var dpr = function (arg) {

    // Return a formatted path if a path was given
    if (typeof arg === 'string') return format(arg);

    // Configure if arg is an object
    if (typeof arg === 'object') return config(arg);

    // Return the current DPR
    return get();
  };

  // Get the current DPR (I say current because it can actually change if a
  // window is dragged from, for example, a retina display to a standard 72 or
  // 92 ppi display)
  var get = function () {

    // Check support for devicePixelRatio and matchMedia
    var n = window.devicePixelRatio;
    var mm = window.matchMedia;

    // Use the fallback if neither DPR-finding method is supported
    if (!n || !mm) return dpr.fallback;

    // Remember the highest supported dpr
    var supported = dpr.supported;
    var best = null;
    var mdpr = 'min-device-pixel-ratio: ';

    // Iterate through the available DPRs and find the best match
    for (var i = 0, l = supported.length; i < l; ++i) {
      var check = supported[i];
      var mdprCheck = mdpr + check;

      // See if the DPR is >= what we can offer
      if (best === null || n >= check || mm &&
          mm(mdprCheck).matches ||
          mm('-webkit-' + mdprCheck).matches ||
          mm('-moz-' + mdprCheck).matches ||
          mm('-o-' + mdprCheck).matches ||
          mm('-ms-' + mdprCheck).matches) {
        best = check;

      // We've reached the limit
      } else {
        break;
      }
    }

    // `best` is the best available match
    return best;
  };

  // Format a path for the current dpr based on the set formatPattern
  var format = function (path) {
    var n = dpr();

    // If the DPR is 1 and formatOne is false, don't do anything to path
    if (n === 1 && !dpr.one) return path;

    // Otherwise, replace the necessary part of the path with the goods
    return path.replace(dpr.match, dpr.replace.replace(/#/, n));
  };

  // Scan the document for img[data-dpr-src] elements in need of the correct src
  // attribute
  dpr.scan = function ($el) {
    if (!$) return;
    $el || ($el = $(document));
    $('img[data-dpr-src]', $el).each(function () {
      var $self = $(this);
      var src = {src: dpr($self.data('dprSrc'))};
      $self.attr(src).removeAttr('data-dpr-src');
    });
  };

  // Define a configure method for easy option setting
  var config = function (options) {

    var scan = options.readyScan;

    // Turn readyScan on or off
    if (scan != dpr.readyScan && $) {
      $(document)[scan ? 'on' : 'off']('ready', dpr.scan);
    }

    // Apply the settings
    for (var name in options) dpr[name] = options[name];

    // Return the DPR object for chaining
    return dpr;
  };

  config({

    // These are the ratios we have images for. Sort ASC (i.e. [1, 1.5, 2])
    supported: [1, 2],

    // Specify a fallback for when the DPR cannot be determined. I assume 1 for
    // now, but maybe assume 2 in a couple years, when bandwidth/average DPR
    // increases, but for now be conservative.
    fallback: 1,

    // What part of the file do we want to replace?
    match: /(\..*)/,

    // How should filename alterations be formatted? (# is the dpr)
    replace: '-#x$1',

    // Should filenames with DPR of 1 be formatted?
    one: true,

    // Should dpr scan the document when the DOM is ready? (requires jQuery or
    // Zepto)
    readyScan: true
  });

  return dpr;
});
