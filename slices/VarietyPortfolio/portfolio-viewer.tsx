'use client'

import type { ImageField, RichTextField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Spec = { label: string; value: string }

export type VarietyItem = {
  id: string
  name: string
  family: string
  size: string | null
  code: string | null
  image: ImageField
  description: RichTextField
  plantSpecs: Spec[]
  fruitSpecs: Spec[]
}

/** Family filter + sliding row of variety cards; "View Details" opens the spec sheet. */
export function PortfolioViewer({
  varieties,
  allLabel,
  className,
}: {
  varieties: VarietyItem[]
  allLabel: string
  className?: string
}) {
  const families = [...new Set(varieties.map((variety) => variety.family))]
  const [family, setFamily] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const visible = family
    ? varieties.filter((variety) => variety.family === family)
    : varieties

  if (varieties.length === 0) return null

  return (
    <div className={className}>
      {/* Only worth showing once there is more than one family. */}
      {families.length > 1 && (
        <div className="mb-6 flex justify-center">
          <div
            role="tablist"
            className="bg-card flex max-w-full scrollbar-none gap-1 overflow-x-auto rounded-full p-1"
          >
            {[null, ...families].map((option) => {
              const selected = option === family
              return (
                <button
                  key={option ?? 'all'}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFamily(option)}
                  className={cn(
                    'text-body flex shrink-0 items-center gap-2 rounded-full px-5 py-4 leading-none transition-colors',
                    selected
                      ? 'bg-foreground text-card'
                      : 'hover:bg-background',
                  )}
                >
                  {selected && (
                    <span className="bg-card size-2 rounded-full" aria-hidden />
                  )}
                  {option ?? allLabel}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <ul className="portfolio-track scrollbar-none">
        {visible.map((variety) => {
          const open = variety.id === openId
          const detailsId = `variety-details-${variety.id}`
          return (
            <li
              key={variety.id}
              className="bg-card flex snap-start flex-col gap-4 rounded-4xl p-2"
            >
              <div className="bg-background relative aspect-square overflow-hidden rounded-3xl">
                <PrismicNextImage
                  field={variety.image}
                  fill
                  fallbackAlt=""
                  sizes="(min-width: 64em) 30rem, (min-width: 48em) 50vw, 85vw"
                  className="object-cover"
                />
                <div
                  id={detailsId}
                  inert={!open}
                  className={cn(
                    'bg-card absolute inset-0 flex flex-col gap-6 overflow-y-auto p-4 transition-opacity',
                    open ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <div className="text-body text-muted">
                    <PrismicRichText field={variety.description} />
                  </div>
                  <SpecList title="Plant" specs={variety.plantSpecs} />
                  <SpecList title="Fruit" specs={variety.fruitSpecs} />
                </div>
              </div>

              <div className="flex flex-col gap-8 p-3">
                <h3 className="font-display text-h3 leading-tight">
                  {variety.name}
                </h3>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <ul className="flex gap-1">
                    {[variety.size, variety.code].map(
                      (tag) =>
                        tag && (
                          <li
                            key={tag}
                            className="text-body-sm rounded-full border border-current px-3 py-2 leading-none"
                          >
                            {tag}
                          </li>
                        ),
                    )}
                  </ul>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={detailsId}
                    onClick={() => setOpenId(open ? null : variety.id)}
                    className="text-body px-3 pt-4 pb-3 underline underline-offset-8"
                  >
                    {open ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function SpecList({ title, specs }: { title: string; specs: Spec[] }) {
  if (specs.length === 0) return null
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-display text-body md:text-h6">{title}</h4>
      <dl className="text-body-sm grid grid-cols-2 gap-x-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-primary-muted col-span-2 grid grid-cols-subgrid border-b py-2"
          >
            <dt className="text-muted">{spec.label}</dt>
            <dd>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
