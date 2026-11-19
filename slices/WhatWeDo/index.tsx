import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { ActionLink } from '@/components/ui/action-link'
import { cn } from '@/lib/utils'

export type WhatWeDoProps = SliceComponentProps<Content.WhatWeDoSlice>

/**
 * Intro + focus-area cards. Later: autoplay between areas on a timer, or manual
 * switching via the numbered segmented control. Static for now — shows the
 * first area.
 */
const WhatWeDo = ({ slice }: WhatWeDoProps) => {
  const { primary } = slice
  const activeIndex = 0
  const active = primary.areas[activeIndex]

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container pt-34 pb-24"
    >
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="font-display flex flex-col items-center gap-12">
          {primary.eyebrow && (
            <p className="text-shoulder">{primary.eyebrow}</p>
          )}
          <PrismicRichText
            field={primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-h1-sm md:text-h1 max-w-265 text-balance">
                  {children}
                </h2>
              ),
            }}
          />
        </div>
        <PrismicRichText
          field={primary.description}
          components={{
            paragraph: ({ children }) => (
              <p className="text-h6 text-muted max-w-176">{children}</p>
            ),
          }}
        />
      </div>

      {active && (
        <div className="grid-default mt-16">
          <div className="bg-muted relative col-span-4 aspect-square overflow-hidden rounded-4xl md:col-span-6 md:aspect-auto md:min-h-150">
            <PrismicNextImage
              field={active.image}
              fill
              fallbackAlt=""
              sizes="(min-width: 48em) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-b from-transparent from-20% to-black/20 to-63%"
            />

            <ol
              aria-label="Focus areas"
              className="text-card absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-5 rounded-full bg-black/15 px-3 py-2 backdrop-blur-md"
            >
              {primary.areas.map((area, index) => {
                const isActive = index === activeIndex
                return (
                  <li
                    key={index}
                    aria-current={isActive ? 'step' : undefined}
                    className={cn(
                      'flex cursor-pointer items-center gap-2 px-2 py-2.5',
                      !isActive && 'opacity-30',
                    )}
                  >
                    <span className="flex size-6 items-center justify-center rounded-full border border-current text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span className={cn('text-body', !isActive && 'sr-only')}>
                      {area.name}
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="bg-primary col-span-4 flex flex-col justify-between gap-12 rounded-4xl p-8 md:col-span-6 md:min-h-150">
            {primary.panel_label && (
              <p className="font-display text-shoulder">
                {primary.panel_label}
              </p>
            )}

            <div className="flex flex-col items-start gap-12">
              <div className="flex max-w-161 flex-col gap-6">
                <PrismicRichText
                  field={active.title}
                  components={{
                    heading3: ({ children }) => (
                      <h3 className="font-display text-h2-sm md:text-h2">
                        {children}
                      </h3>
                    ),
                  }}
                />
                <div className="text-body text-muted flex max-w-99 flex-col gap-5">
                  <PrismicRichText field={active.description} />
                </div>
              </div>

              <ActionLink field={active.link} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default WhatWeDo
