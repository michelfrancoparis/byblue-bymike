import type { LinkField } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { ArrowIcon } from '@/components/icons/arrow'
import { cn } from '@/lib/utils'

const variants = {
  // Blue on light backgrounds
  dark: 'bg-foreground text-card',
  // Off-white on images / dark backgrounds
  light: 'bg-background text-foreground',
}

/**
 * Figma "--action-primary": round arrow icon + pill label, from a Prismic link
 * with text. Renders nothing when the link is empty.
 */
export function ActionLink({
  field,
  variant = 'dark',
  className,
}: {
  field: LinkField
  variant?: keyof typeof variants
  className?: string
}) {
  if (!isFilled.link(field)) return null

  return (
    <PrismicNextLink
      field={field}
      className={cn('text-body flex items-center', className)}
    >
      <span
        className={cn(
          'flex size-12 items-center justify-center rounded-full',
          variants[variant],
        )}
      >
        <ArrowIcon className="size-5" />
      </span>
      <span
        className={cn(
          'rounded-full px-6 py-4.5 leading-none',
          variants[variant],
        )}
      >
        {field.text}
      </span>
    </PrismicNextLink>
  )
}
