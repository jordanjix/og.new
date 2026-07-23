const HEX_COLOR_REGEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
const RGB_COLOR_REGEX =
  /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*[\d.]+\s*)?\)$/i

/**
 * Checks whether a string is a valid CSS color in one of the supported
 * formats: #RGB, #RRGGBB, rgb(r, g, b) or rgba(r, g, b, a).
 */
export function isValidColor(value: string): boolean {
  return toHex6(value) !== null
}

/**
 * Normalizes a supported color string to 6-digit lowercase hex ("#rrggbb"),
 * the only format accepted by <input type="color">. The alpha channel of
 * rgba() colors is dropped. Returns null for unsupported values.
 */
export function toHex6(value: string): string | null {
  const trimmed = value.trim()

  const hexMatch = trimmed.match(HEX_COLOR_REGEX)
  if (hexMatch) {
    const hex = hexMatch[1].toLowerCase()
    if (hex.length === 3) {
      return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
    }
    return `#${hex}`
  }

  const rgbMatch = trimmed.match(RGB_COLOR_REGEX)
  if (rgbMatch) {
    const channels = [rgbMatch[1], rgbMatch[2], rgbMatch[3]].map(Number)
    if (channels.some((c) => c > 255)) {
      return null
    }
    return `#${channels.map((c) => c.toString(16).padStart(2, "0")).join("")}`
  }

  return null
}
