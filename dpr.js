(function (root, factory) {
  if (typeof define === 'function' && define.amd) define(factory);
  else if (typeof exports !== 'undefined') module.exports = factory();
  else root.dpr = factory();
})(this, function () {
  'use strict';

  // The entire API is exposed through one function.
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
    if (n === 1 && !dpr.formatOne) return path;

    // Otherwise, replace the necessary part of the path with the goods
    return path.replace(dpr.match, dpr.replace.replace(/#/, n));
  };

  // Define a configure method for easy option setting
  var config = function (options) {

    // Apply the settings
    for (var name in options) dpr[name] = options[name];

    // Return the DPR object for chaining
    return dpr;
  };

  config({

    // These are the ratios we have images for. Sort ASC (i.e. [1, 1.5, 2])
    supported: [1, 2, 3],

    // Specify a fallback for when the DPR cannot be determined.
    fallback: 2,

    // What part of the file do we want to replace?
    match: /(\..*)/,

    // How should filename alterations be formatted? (# is the dpr)
    replace: '@#x$1',

    // Should filenames with DPR of 1 be formatted?
    formatOne: false
  });

  return dpr;
});
