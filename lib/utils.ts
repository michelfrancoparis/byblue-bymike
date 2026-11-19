import { createCn } from 'cn/config'

// Custom tokens from styles/globals.css, registered so cn resolves conflicts:
// - `global` spacing (--spacing-global, the page gutter): px-global, -mx-global…
// - type scale (--text-*): without it cn reads `text-h6` as a colour and drops
//   it next to a real colour like `text-muted`.
export const cn = createCn({
  extend: {
    theme: {
      spacing: ['global'],
      text: [
        'display',
        'display-sm',
        'shoulder',
        'h1',
        'h1-sm',
        'h2',
        'h2-sm',
        'h4',
        'h5',
        'h6',
        'lead',
        'lead-sm',
        'body',
        'body-sm',
        'caption',
      ],
    },
  },
})
