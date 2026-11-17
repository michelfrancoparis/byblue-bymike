import { createCn } from 'cn/config'

// `global` is a custom spacing token (--spacing-global, the page gutter) —
// registered so cn resolves conflicts for px-global, pl-global, -mx-global, etc.
export const cn = createCn({
  extend: {
    theme: {
      spacing: ['global'],
    },
  },
})
