import type { Content } from '@prismicio/client'
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
      className="overflow-hidden pt-32 pb-32"
    >
      <div className="font-display container flex flex-col items-center gap-12 text-center">
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

      <div className="mt-19">
        <TimelineCarousel
          milestones={primary.milestones}
          autoplayInterval={primary.autoplay_interval}
        />
      </div>
    </section>
  )
}

export default Timeline
