import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        canvas: "#131313",
        background: "#131313",
        surface: "#1b1b1b",
        "surface-raised": "#2a2a2a",
        foreground: "#e5e2e1",
        "foreground-strong": "#f3f0ee",
        muted: "#d7d2cf",
        accent: "#ff5451",
        "accent-soft": "#ffb3ad",
      },
    },
  },
} satisfies Config;
