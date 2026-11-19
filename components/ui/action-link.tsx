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
 * Figma "--action-primary": optional round arrow icon + pill label, from a
 * Prismic link with text. Shows the label as plain text while the link has no
 * destination yet; renders nothing without a label.
 */
export function ActionLink({
  field,
  variant = 'dark',
  withIcon = true,
  className,
}: {
  field: LinkField
  variant?: keyof typeof variants
  withIcon?: boolean
  className?: string
}) {
  if (!field.text) return null

  const content = (
    <>
      {withIcon && (
        <span
          className={cn(
            'flex size-12 items-center justify-center rounded-full',
            variants[variant],
          )}
        >
          <ArrowIcon className="size-5" />
        </span>
      )}
      <span
        className={cn(
          'rounded-full px-6 py-4.5 leading-none',
          variants[variant],
        )}
      >
        {field.text}
      </span>
    </>
  )
  const classes = cn('text-body flex items-center', className)

  return isFilled.link(field) ? (
    <PrismicNextLink field={field} className={classes}>
      {content}
    </PrismicNextLink>
  ) : (
    <span className={cn(classes, 'cursor-pointer')}>{content}</span>
  )
}
