import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import {
  PrismicImage,
  PrismicRichText,
  type SliceComponentProps,
} from '@prismicio/react'
import { cn } from '@/lib/utils'

export type ImageWithCardsProps =
  SliceComponentProps<Content.ImageWithCardsSlice>

/**
 * Centered title over a large image with glass cards on its bottom edge.
 * Later: cards expand on interaction. Static for now — first card open.
 */
const ImageWithCards = ({ slice }: ImageWithCardsProps) => {
  const { primary } = slice
  const openIndex = 0

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container pt-32 pb-24"
    >
      <div className="font-display flex flex-col items-center gap-12 text-center">
        {primary.eyebrow && <p className="text-shoulder">{primary.eyebrow}</p>}
        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-h1-sm md:text-h1 max-w-265">{children}</h2>
            ),
          }}
        />
      </div>

      <div className="bg-muted relative mt-16 flex flex-col justify-end overflow-hidden rounded-4xl md:mt-24 md:min-h-162.5">
        <PrismicNextImage
          field={primary.image}
          fill
          fallbackAlt=""
          sizes="100vw"
          className="object-cover"
        />

        <ul className="text-card relative flex flex-col gap-3 p-3 pt-64 lg:flex-row lg:items-end">
          {primary.cards.map((card, index) => {
            const isOpen = index === openIndex
            return (
              <li
                key={index}
                className={cn(
                  'flex flex-col gap-12 rounded-3xl bg-black/15 p-6 backdrop-blur-xl',
                  isOpen ? 'lg:w-2/5 lg:shrink-0' : 'lg:min-w-0 lg:flex-1',
                )}
              >
                {isOpen && card.icon.url && (
                  <PrismicImage
                    field={card.icon}
                    className="size-9 self-start object-contain"
                  />
                )}
                <div className="flex flex-col gap-4">
                  <PrismicRichText
                    field={card.title}
                    components={{
                      heading3: ({ children }) => (
                        <h3 className="font-display text-h5">{children}</h3>
                      ),
                    }}
                  />
                  {isOpen && (
                    <div className="text-body max-w-99">
                      <PrismicRichText field={card.description} />
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default ImageWithCards
