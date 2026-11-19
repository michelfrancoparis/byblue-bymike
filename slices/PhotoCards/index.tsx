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

      <div className="grid-default mt-17 items-start gap-y-8">
        <div className="col-span-4 md:col-span-6">
          <PrismicRichText
            field={primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-display text-h2-sm md:text-h2 max-w-147">
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

      <ul className="grid-default mt-24 gap-y-2 md:mt-32">
        {primary.cards.map((card, index) => (
          <li
            key={index}
            className="bg-muted relative col-span-4 aspect-67/60 overflow-hidden rounded-3xl"
          >
            <PrismicNextImage
              field={card.image}
              fill
              fallbackAlt=""
              sizes="(min-width: 48em) 33vw, 100vw"
              className="object-cover"
            />
            <div className="photo-card-glass text-background absolute inset-x-2 bottom-2 flex flex-col gap-2 rounded-2xl p-4">
              {card.title && (
                <h3 className="font-display text-h5-sm md:text-h5 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="bg-background size-3 shrink-0 rounded-full"
                  />
                  {card.title}
                </h3>
              )}
              {card.text && <p className="text-body">{card.text}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PhotoCards
