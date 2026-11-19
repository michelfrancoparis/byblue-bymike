import type { Content } from '@prismicio/client'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { Globe, type GlobeLocation } from '@/components/globe'
import { createClient } from '@/prismicio'

export type OriginsMapProps = SliceComponentProps<Content.OriginsMapSlice>

/** Title row + interactive globe with every Country document as a label. */
const OriginsMap = async ({ slice }: OriginsMapProps) => {
  const { primary } = slice
  const countries = await createClient().getAllByType('country', {
    orderings: { field: 'my.country.name' },
  })

  const locations: GlobeLocation[] = countries.flatMap(({ data }) =>
    data.name && data.latitude !== null && data.longitude !== null
      ? [
          {
            name: data.name,
            lat: data.latitude,
            lon: data.longitude,
            side: data.label_side === 'left' ? 'left' : 'right',
          },
        ]
      : [],
  )

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container pt-20 pb-16 md:pt-4 md:pb-24"
    >
      <div className="divider origin-top scale-y-50" />
      {primary.eyebrow && (
        <p className="font-display text-shoulder-sm md:text-shoulder mt-4">
          {primary.eyebrow}
        </p>
      )}

      <div className="grid-default mt-6 gap-y-3 md:mt-14 md:gap-y-6">
        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="font-display text-h2-sm md:text-h2 col-span-4 max-w-93 md:col-span-6">
                {children}
              </h2>
            ),
          }}
        />
        <div className="text-body text-muted col-span-4 max-w-102 md:col-start-9 md:pt-7.5 md:opacity-60">
          <PrismicRichText field={primary.description} />
        </div>
      </div>

      <div className="bg-foreground mt-16 h-140 cursor-grab overflow-hidden rounded-3xl active:cursor-grabbing md:mt-20 md:rounded-4xl">
        <Globe locations={locations} />
      </div>
    </section>
  )
}

export default OriginsMap
