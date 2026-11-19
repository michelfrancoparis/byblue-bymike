'use client'

import type { ImageField, RichTextField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export type LocationItem = {
  id: string
  name: string
  label: string | null
  address: RichTextField
  photo: ImageField
  map: ImageField
}

/** Background photo + glass card; the tabs switch location (cross-fade). */
export function LocationsViewer({
  locations,
  className,
}: {
  locations: LocationItem[]
  className?: string
}) {
  const [current, setCurrent] = useState(0)
  const location = locations[current]
  if (!location) return null

  return (
    <div
      className={cn(
        'bg-muted relative flex overflow-hidden rounded-4xl p-2 pt-48 md:min-h-140 md:pt-2',
        className,
      )}
    >
      {locations.map((item, index) => (
        <PrismicNextImage
          key={item.id}
          field={item.photo}
          fill
          fallbackAlt=""
          sizes="100vw"
          className={cn(
            'object-cover transition-opacity duration-500',
            index === current ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}

      <div className="location-glass text-card relative flex w-full flex-col gap-6 rounded-3xl p-2 md:w-116">
        <div className="relative aspect-video overflow-hidden rounded-2xl md:aspect-auto md:flex-1">
          {locations.map((item, index) => (
            <PrismicNextImage
              key={item.id}
              field={item.map}
              fill
              fallbackAlt=""
              sizes="(min-width: 48em) 28rem, 100vw"
              className={cn(
                'object-cover transition-opacity duration-500',
                index === current ? 'opacity-100' : 'opacity-0',
              )}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 pl-2" aria-live="polite">
          {location.label && <p className="text-body-sm">{location.label}</p>}
          <h3 className="font-display text-h3">{location.name}</h3>
          <div className="text-body opacity-60">
            <PrismicRichText field={location.address} />
          </div>
        </div>

        {locations.length > 1 && (
          <div role="tablist" className="flex gap-1 p-1">
            {locations.map((item, index) => {
              const selected = index === current
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setCurrent(index)}
                  className={cn(
                    'text-body flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 leading-none transition-colors',
                    selected ? 'bg-card text-foreground' : 'hover:bg-card/10',
                  )}
                >
                  {selected && (
                    <span
                      className="bg-foreground size-2 rounded-full"
                      aria-hidden
                    />
                  )}
                  {item.name}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
