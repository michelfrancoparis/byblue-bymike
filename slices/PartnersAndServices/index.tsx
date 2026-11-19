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
      className="container flex flex-col items-center pt-18 pb-16 md:pt-32 md:pb-24"
    >
      <div className="font-display flex flex-col items-start gap-6 self-stretch md:items-center md:gap-12 md:self-auto md:text-center">
        {primary.eyebrow && (
          <p className="text-shoulder-sm md:text-shoulder">{primary.eyebrow}</p>
        )}
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
        <ul className="-mx-global px-global mt-12 flex w-screen max-w-none scrollbar-none gap-3 overflow-x-auto md:mx-0 md:mt-21.5 md:w-full md:max-w-313 md:justify-between md:gap-6 md:overflow-visible md:px-0">
          {partners.map((partner) => (
            <li
              key={partner.id}
              className="relative h-12 w-38 shrink-0 md:h-15 md:w-48 md:shrink"
            >
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

      <ul className="-mx-global px-global mt-16 flex w-screen snap-x snap-mandatory scroll-px-2 scrollbar-none gap-2 overflow-x-auto md:mx-0 md:mt-24 md:grid md:w-full md:grid-cols-12 md:overflow-visible md:px-0">
        {primary.cards.map((card, index) => (
          <li
            key={index}
            className="bg-primary text-foreground col-span-4 flex min-h-88.5 w-78 shrink-0 snap-start flex-col justify-between gap-24 rounded-3xl p-6 md:min-h-89 md:w-auto md:gap-12 md:rounded-4xl"
          >
            {card.icon.url && (
              <PrismicImage
                field={card.icon}
                className="h-11.5 w-auto self-start md:h-13"
              />
            )}
            <div className="flex flex-col gap-12 md:gap-8">
              <PrismicRichText
                field={card.title}
                components={{
                  heading3: ({ children }) => (
                    <h3 className="font-display text-h2-sm md:text-h5">
                      {children}
                    </h3>
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

      <ActionLink
        field={primary.link}
        withIcon={false}
        className="mt-6 md:mt-19"
      />
    </section>
  )
}

export default PartnersAndServices
