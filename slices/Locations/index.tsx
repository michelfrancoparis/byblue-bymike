import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { LocationsViewer, type LocationItem } from './locations-viewer'

export type LocationsProps = SliceComponentProps<Content.LocationsSlice>

/**
 * Centered title over a wide photo with a glass card (map, details, tabs).
 * Locations and their order are picked from the Location collection.
 */
const Locations = ({ slice }: LocationsProps) => {
  const { primary } = slice
  const locations: LocationItem[] = primary.locations.flatMap(({ location }) =>
    isFilled.contentRelationship(location) && location.data?.name
      ? [
          {
            id: location.id,
            name: location.data.name,
            label: location.data.label ?? null,
            address: location.data.address,
            photo: location.data.photo,
            map: location.data.map,
          },
        ]
      : [],
  )

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container py-18"
    >
      <div className="font-display flex flex-col items-center gap-12 text-center">
        {primary.eyebrow && (
          <p className="text-shoulder-sm md:text-shoulder">{primary.eyebrow}</p>
        )}
        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-h1-sm md:text-h1 text-balance">{children}</h2>
            ),
          }}
        />
      </div>

      <LocationsViewer locations={locations} className="mt-16 md:mt-26" />
    </section>
  )
}

export default Locations
