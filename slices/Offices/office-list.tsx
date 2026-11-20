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

/**
 * Hover, focus or tap an office to highlight it and show its photo.
 * Below lg (Figma mobile): one tall photo with a glass card on top — the
 * office's details plus a segmented control to switch offices.
 */
export function OfficeList({
  offices,
  className,
}: {
  offices: Office[]
  className?: string
}) {
  const [current, setCurrent] = useState(0)
  if (offices.length === 0) return null

  const active = offices[current]

  return (
    <div className={className}>
      <div className="bg-foreground relative flex min-h-154.5 flex-col justify-end overflow-hidden rounded-3xl p-2 lg:hidden">
        <Photos offices={offices} current={current} sizes="100vw" />
        <div className="photo-card-glass text-card relative flex flex-col gap-6 rounded-2xl px-3 pt-10 pb-3">
          {active.tagline && (
            <p className="text-caption uppercase">{active.tagline}</p>
          )}
          <div className="flex flex-col gap-2">
            <p className="font-display text-h5-sm">{active.name}</p>
            <div className="text-body opacity-60">
              <Address field={active.address} />
            </div>
          </div>
          {offices.length > 1 && (
            <div className="flex scrollbar-none overflow-x-auto rounded-full">
              {offices.map((office, index) => {
                const selected = index === current
                return (
                  <button
                    key={office.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setCurrent(index)}
                    className={cn(
                      'text-body-sm flex h-12 flex-1 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full px-5 whitespace-nowrap transition-colors',
                      selected && 'bg-card text-foreground',
                    )}
                  >
                    {selected && (
                      <span
                        aria-hidden="true"
                        className="bg-foreground size-2 rounded-full"
                      />
                    )}
                    {office.name}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="hidden gap-2 lg:flex lg:flex-row">
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
                    <Address field={office.address} />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="bg-foreground relative min-h-112 flex-1 overflow-hidden rounded-2xl">
          <Photos offices={offices} current={current} sizes="65vw" />
        </div>
      </div>
    </div>
  )
}

/** All office photos stacked; only the current one is visible. */
function Photos({
  offices,
  current,
  sizes,
}: {
  offices: Office[]
  current: number
  sizes: string
}) {
  return offices.map((office, index) => (
    <PrismicNextImage
      key={office.id}
      field={office.photo}
      fill
      fallbackAlt=""
      sizes={sizes}
      className={cn(
        'object-cover transition-opacity',
        index === current ? 'opacity-100' : 'opacity-0',
      )}
    />
  ))
}

function Address({ field }: { field: RichTextField }) {
  return (
    <PrismicRichText
      field={field}
      components={{
        paragraph: ({ children }) => <span className="block">{children}</span>,
      }}
    />
  )
}
