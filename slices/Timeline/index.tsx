import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { TimelineCarousel } from './timeline-carousel'

export type TimelineProps = SliceComponentProps<Content.TimelineSlice>

/** Editable company milestones, displayed as an automatically advancing carousel. */
const Timeline = ({ slice }: TimelineProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden py-24 md:py-32"
    >
      <div className="font-display container flex flex-col items-start gap-6 md:items-center md:gap-12 md:text-center">
        {primary.eyebrow && (
          <p className="text-shoulder-sm md:text-shoulder">{primary.eyebrow}</p>
        )}
        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-h1-sm md:text-h1 max-w-308 text-balance">
                {children}
              </h2>
            ),
          }}
        />
      </div>

      {/* Mobile: every milestone in a row that snaps card by card (Figma). */}
      <ul className="px-global mt-16 flex snap-x snap-mandatory scroll-px-2 scrollbar-none gap-1.5 overflow-x-auto md:hidden">
        {primary.milestones.map((milestone, index) => (
          <li
            key={index}
            className="relative h-92.5 w-80.5 shrink-0 snap-start overflow-hidden rounded-3xl"
          >
            <PrismicNextImage
              field={milestone.image}
              fill
              fallbackAlt=""
              sizes="20rem"
              className="object-cover"
            />
            <div className="timeline-card-copy text-card absolute inset-x-3 bottom-3 flex flex-col gap-6 rounded-2xl p-4">
              <PrismicRichText
                field={milestone.title}
                components={{
                  heading3: ({ children }) => (
                    <h3 className="font-display text-h5-sm before:bg-card flex items-center gap-1.5 before:size-2 before:shrink-0 before:rounded-full before:content-['']">
                      {children}
                    </h3>
                  ),
                }}
              />
              <div className="text-body-sm">
                <PrismicRichText field={milestone.description} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-19 hidden md:block">
        <TimelineCarousel
          milestones={primary.milestones}
          autoplayInterval={primary.autoplay_interval}
        />
      </div>
    </section>
  )
}

export default Timeline
