import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { OfficeList, type Office } from './office-list'

export type OfficesProps = SliceComponentProps<Content.OfficesSlice>

/** Light blue: centered title, office list beside a photo of the one in focus. */
const Offices = ({ slice }: OfficesProps) => {
  const { primary } = slice
  const offices: Office[] = primary.offices.flatMap(({ location }) =>
    isFilled.contentRelationship(location) && location.data?.name
      ? [
          {
            id: location.id,
            name: location.data.name,
            tagline: location.data.tagline ?? null,
            address: location.data.address,
            photo: location.data.photo,
          },
        ]
      : [],
  )

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-primary py-18 md:py-21"
    >
      <div className="container">
        <div className="font-display flex flex-col items-center gap-12 text-center">
          {primary.eyebrow && (
            <p className="text-shoulder">{primary.eyebrow}</p>
          )}
          <PrismicRichText
            field={primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-h1-sm md:text-h1 max-w-180 text-balance">
                  {children}
                </h2>
              ),
            }}
          />
        </div>

        <OfficeList offices={offices} className="mt-16 md:mt-24" />
      </div>
    </section>
  )
}

export default Offices
