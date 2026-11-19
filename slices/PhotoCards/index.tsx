import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'

export type PhotoCardsProps = SliceComponentProps<Content.PhotoCardsSlice>

/** Divider + eyebrow, title left and text right; photo cards with a glass caption. */
const PhotoCards = ({ slice }: PhotoCardsProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container py-18"
    >
      <div className="divider origin-top scale-y-50" />
      {primary.eyebrow && (
        <p className="font-display text-shoulder-sm md:text-shoulder mt-4">
          {primary.eyebrow}
        </p>
      )}

      <div className="grid-default mt-6 items-start gap-y-4 md:mt-17 md:gap-y-8">
        <div className="col-span-4 md:col-span-6">
          <PrismicRichText
            field={primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-display text-h2-sm md:text-h2 max-w-78.5 md:max-w-147">
                  {children}
                </h2>
              ),
            }}
          />
        </div>
        <div className="text-body md:text-h6 text-muted col-span-4 max-w-109 md:col-start-9">
          <PrismicRichText field={primary.description} />
        </div>
      </div>

      {/* Mobile: cards slide sideways (Figma). */}
      <ul className="-mx-global px-global mt-16 flex snap-x snap-mandatory scroll-px-2 scrollbar-none gap-1.5 overflow-x-auto md:mx-0 md:mt-32 md:grid md:grid-cols-12 md:gap-2 md:overflow-visible md:px-0">
        {primary.cards.map((card, index) => (
          <li
            key={index}
            className="bg-muted relative h-92.5 w-80.5 shrink-0 snap-start overflow-hidden rounded-3xl md:col-span-4 md:aspect-67/60 md:h-auto md:w-auto"
          >
            <PrismicNextImage
              field={card.image}
              fill
              fallbackAlt=""
              sizes="(min-width: 48em) 33vw, 100vw"
              className="object-cover"
            />
            <div className="photo-card-glass text-background absolute inset-x-3 bottom-3 flex flex-col gap-6 rounded-2xl p-4 md:inset-x-2 md:bottom-2 md:gap-2">
              {card.title && (
                <h3 className="font-display text-h5-sm md:text-h5 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="bg-background size-2 shrink-0 rounded-full md:size-3"
                  />
                  {card.title}
                </h3>
              )}
              {card.text && (
                <p className="text-body-sm md:text-body">{card.text}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PhotoCards
