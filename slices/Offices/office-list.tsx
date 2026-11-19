'use client'

import type { ImageField, RichTextField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export type Office = {
  id: string
  name: string
  tagline: string | null
  address: RichTextField
  photo: ImageField
}

/** Hover, focus or tap an office to highlight it and show its photo. */
export function OfficeList({
  offices,
  className,
}: {
  offices: Office[]
  className?: string
}) {
  const [current, setCurrent] = useState(0)
  if (offices.length === 0) return null

  return (
    <div className={cn('flex flex-col gap-2 lg:flex-row', className)}>
      <ul className="flex flex-col gap-2 lg:w-117 lg:shrink-0 lg:gap-4">
        {offices.map((office, index) => {
          const active = index === current
          return (
            <li key={office.id}>
              <button
                type="button"
                aria-pressed={active}
                onPointerEnter={() => setCurrent(index)}
                onFocus={() => setCurrent(index)}
                onClick={() => setCurrent(index)}
                className={cn(
                  'flex w-full flex-col items-start gap-3 rounded-2xl p-4 text-left transition-colors',
                  active ? 'bg-foreground text-card' : 'text-foreground',
                )}
              >
                {office.tagline && (
                  <span className="text-caption font-semibold uppercase">
                    {office.tagline}
                  </span>
                )}
                <span className="font-display text-h5-sm md:text-h5">
                  {office.name}
                </span>
                <span
                  className={cn(
                    'text-body',
                    active ? 'text-card/80' : 'text-muted',
                  )}
                >
                  <PrismicRichText
                    field={office.address}
                    components={{
                      paragraph: ({ children }) => (
                        <span className="block">{children}</span>
                      ),
                    }}
                  />
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="bg-foreground relative aspect-video overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-112 lg:flex-1">
        {offices.map((office, index) => (
          <PrismicNextImage
            key={office.id}
            field={office.photo}
            fill
            fallbackAlt=""
            sizes="(min-width: 64em) 65vw, 100vw"
            className={cn(
              'object-cover transition-opacity duration-500',
              index === current ? 'opacity-100' : 'opacity-0',
            )}
          />
        ))}
      </div>
    </div>
  )
}
