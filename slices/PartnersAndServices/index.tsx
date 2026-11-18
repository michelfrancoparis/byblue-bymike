import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import {
  PrismicImage,
  PrismicRichText,
  type SliceComponentProps,
} from '@prismicio/react'
import { ActionLink } from '@/components/ui/action-link'

export type PartnersAndServicesProps =
  SliceComponentProps<Content.PartnersServicesSlice>

/**
 * Centered title, partner logo row (a marquee later), feature cards, button.
 * Logos come from the linked Partner documents.
 */
const PartnersAndServices = ({ slice }: PartnersAndServicesProps) => {
  const { primary } = slice
  const partners = primary.partners.flatMap(({ partner }) =>
    isFilled.contentRelationship(partner) && partner.data ? [partner] : [],
  )

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container flex flex-col items-center pt-32 pb-24"
    >
      <div className="font-display flex flex-col items-center gap-12 text-center">
        {primary.eyebrow && <p className="text-shoulder">{primary.eyebrow}</p>}
        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-h1-sm md:text-h1 max-w-244">{children}</h2>
            ),
          }}
        />
      </div>

      {partners.length > 0 && (
        <ul className="mt-16 flex w-full max-w-313 flex-wrap justify-center gap-6 md:mt-21.5 md:flex-nowrap md:justify-between">
          {partners.map((partner) => (
            <li key={partner.id} className="relative h-15 w-48">
              <PrismicNextImage
                field={partner.data?.logo}
                fill
                fallbackAlt=""
                sizes="12rem"
                className="object-contain mix-blend-multiply"
              />
            </li>
          ))}
        </ul>
      )}

      <ul className="grid-default mt-24 w-full gap-y-2">
        {primary.cards.map((card, index) => (
          <li
            key={index}
            className="bg-primary text-foreground col-span-4 flex min-h-89 flex-col justify-between gap-12 rounded-4xl p-6"
          >
            {card.icon.url && (
              <PrismicImage
                field={card.icon}
                className="h-13 w-auto self-start"
              />
            )}
            <div className="flex flex-col gap-8">
              <PrismicRichText
                field={card.title}
                components={{
                  heading3: ({ children }) => (
                    <h3 className="font-display text-h5">{children}</h3>
                  ),
                }}
              />
              <div className="text-body max-w-96">
                <PrismicRichText field={card.text} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ActionLink field={primary.link} withIcon={false} className="mt-19" />
    </section>
  )
}

export default PartnersAndServices
