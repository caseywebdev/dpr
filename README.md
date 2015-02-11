dpr
===

Trying to make life easier in a world with too many **d**evice **p**ixel
**r**atios.

Install
-------

```bash
(bower|npm) install dpr
```

Use
---

```js
// Return the current device pixel ratio. The reason this is not a constant is
// it can change between monitors!
dpr();

// Update the config. The defaults are shown.
dpr({

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

// Get a dpr-appropriate file name.
// returns 'foo-bar.png' for dpr=1, 'foo-bar@2.png' for dpr=2, etc...
dpr('foo-bar.png');
```
