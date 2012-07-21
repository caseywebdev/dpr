# Define the namespace
@dpr = (path) ->

  # Return a formatted path if a path was given
  return format path if typeof path is 'string'

  # Otherwise, return the current DPR
  get()

# Format a path for the current dpr based on the set formatPattern
format = (path) ->

  # If the DPR is 1 and formatOne is false, don't do anything to path
  return path if (n = dpr()) is 1 and not dpr.format.one

  # Otherwise, replace the necessary part of the path with the goods
  path.replace dpr.format.match, dpr.format.replace.replace /#/, n

# Get the current DPR (I say current because it can actually change if a
# window is dragged from, for example, a retina display to a standard 72 or
# 92 ppi display)
get = ->

  # Check support for devicePixelRatio and matchMedia
  n = window.devicePixelRatio
  mm = window.matchMedia

  # Use the default if neither DPR-finding method is supported
  return dpr.default unless n or mm

  highest = dpr.supported[dpr.supported.length - 1]
  mdpr = 'min-device-pixel-ratio: '
  # Iterate through the available DPRs and find the best match
  for check in dpr.supported

    # See if the DPR is >= what we can offer
    if n >= check or mm and
        mm("#{mdpr}#{check}").matches or
        mm("-webkit-#{mdpr}#{check}").matches or
        mm("-moz-#{mdpr}#{check}").matches or
        mm("-o-#{mdpr}#{check}").matches or
        mm("-ms-#{mdpr}#{check}").matches
      continue unless check is highest

    # If we reached this point, `check` is the best available match
    return check

# Define a configure method for easy option setting
(
  dpr.configure = (options) ->
    dpr[name] = option for name, option of options
    return dpr
)

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
