"use client"

import { useEffect, useState } from "react"

import { isValidColor, toHex6 } from "@/lib/colors"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColorInputProps {
  id: string
  label?: string
  value: string
  selected?: boolean
  onChange: (color: string) => void
}

export function ColorInput({
  id,
  label,
  value,
  selected,
  onChange,
}: ColorInputProps) {
  const [text, setText] = useState(value)

  const hexValue = toHex6(value) ?? "#000000"
  const isInvalid = !isValidColor(text)

  // resync the text field when the color changes externally (e.g. a preset
  // swatch is clicked), without clobbering an equivalent value being typed
  useEffect(() => {
    setText((current) => (toHex6(current) === toHex6(value) ? current : value))
  }, [value])

  return (
    <div className="w-full space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={label ? `${label} color picker` : "Color picker"}
          value={hexValue}
          onChange={(e) => {
            setText(e.target.value)
            onChange(e.target.value)
          }}
          className={cn(
            "size-9 min-h-9 min-w-9 cursor-pointer rounded-md border-2 border-muted bg-popover [&::-moz-color-swatch]:rounded [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-1 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none",
            selected && "border-primary"
          )}
        />
        <Input
          id={id}
          value={text}
          placeholder="#FF5733"
          spellCheck={false}
          onChange={(e) => {
            const raw = e.target.value
            setText(raw)
            const hex = toHex6(raw)
            if (hex) {
              onChange(hex)
            }
          }}
          onBlur={() => {
            if (!isValidColor(text)) {
              setText(hexValue)
            }
          }}
          className={cn(
            isInvalid && "border-destructive focus-visible:ring-destructive"
          )}
        />
      </div>
    </div>
  )
}
