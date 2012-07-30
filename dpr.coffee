$ = window.jQuery or window.Zepto

# Store the computed dpr for subsequent calls
cache = null

# Define the namespace
@dpr = (arg) ->

  # Return a formatted path if a path was given
  return format arg if typeof arg is 'string'

  # Configure if arg is an object
  return config arg if typeof arg is 'object'

  # Return the current DPR
  get()

# Get the current DPR (I say current because it can actually change if a
# window is dragged from, for example, a retina display to a standard 72 or
# 92 ppi display)
get = ->

  return cache if cache

  # Check support for devicePixelRatio and matchMedia
  n = window.devicePixelRatio
  mm = window.matchMedia

  # Use the default if neither DPR-finding method is supported
  return dpr.default unless n or mm

  # Remember the highest supported dpr
  supported = dpr.supported
  best = null
  max = supported[supported.length - 1]
  mdpr = 'min-device-pixel-ratio: '

  # Iterate through the available DPRs and find the best match
  for check in supported

    # See if the DPR is >= what we can offer
    if best is null or n >= check or mm and
        mm("#{mdpr}#{check}").matches or
        mm("-webkit-#{mdpr}#{check}").matches or
        mm("-moz-#{mdpr}#{check}").matches or
        mm("-o-#{mdpr}#{check}").matches or
        mm("-ms-#{mdpr}#{check}").matches
      best = check

    # We've reached the limit
    else
      break

  # `best` is the best available match
  cache = best

# Format a path for the current dpr based on the set formatPattern
format = (path) ->

  # If the DPR is 1 and formatOne is false, don't do anything to path
  return path if (n = dpr()) is 1 and not dpr.one

  # Otherwise, replace the necessary part of the path with the goods
  path.replace dpr.match, dpr.replace.replace /#/, n

# Scan the document for img[data-dpr-src] elements in need of the correct src
# attribute
dpr.scan = ->
  if $
    $('img[data-dpr-src]').each ->
      ($t = $ @).attr(src: dpr $t.data 'dprSrc').removeAttr 'data-dpr-src'

# Define a configure method for easy option setting
(config = (options) ->

  # Clear the cached DPR if the supported or default DPR changed
  if (options.supported and "#{options.supported}" isnt "#{dpr.supported}") or
      (options.default and options.default isnt dpr.default)
    cache = null

  # Apply the settings
  dpr[name] = option for name, option of options


  # Turn readyScan on or off
  if $
    $[if dpr.readyScan then 'on' else 'off'] 'ready', dpr.scan

  # Return the DPR object for chaining
  dpr
)

  # These are the ratios we have images for. Sort ASC (i.e. [1, 1.5, 2])
  supported: [1, 2]

  # Specify a default for when the DPR cannot be determined. I assume 1 for
  # now, but maybe assume 2 in a couple years, when bandwidth/average DPR
  # increases, but for now be conservative.
  default: 1

  # What part of the file do we want to replace?
  match: /(\..*)/

  # How should filename alterations be formatted? (# is the dpr)
  replace: '-#x$1'

  # Should filenames with DPR of 1 be formatted?
  one: true

  # Should dpr scan the document when the DOM is ready? (requires jQuery or
  # Zepto)
  readyScan: true
