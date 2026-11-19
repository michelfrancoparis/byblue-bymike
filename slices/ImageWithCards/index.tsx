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
      className="container pt-10 pb-16 md:pt-32 md:pb-24"
    >
      <div className="font-display flex flex-col items-start gap-6 md:items-center md:gap-12 md:text-center">
        {primary.eyebrow && (
          <p className="text-shoulder-sm md:text-shoulder">{primary.eyebrow}</p>
        )}
        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-h1-sm md:text-h1 max-w-265">{children}</h2>
            ),
          }}
        />
      </div>

      <div className="bg-muted -mx-global relative mt-16 flex min-h-167.75 flex-col justify-end overflow-hidden md:mx-0 md:mt-24 md:min-h-162.5 md:rounded-4xl">
        <PrismicNextImage
          field={primary.image}
          fill
          fallbackAlt=""
          sizes="100vw"
          className="object-cover"
        />

        <ul className="text-card relative flex snap-x snap-mandatory scroll-px-2 scrollbar-none items-end gap-2 overflow-x-auto px-2 pb-12 md:snap-none md:flex-col md:items-stretch md:gap-3 md:overflow-visible md:p-3 md:pt-64 lg:flex-row lg:items-end">
          {primary.cards.map((card, index) => {
            const isOpen = index === openIndex
            return (
              <li
                key={index}
                className={cn(
                  'flex shrink-0 snap-start flex-col gap-6 rounded-xl bg-black/15 p-6 backdrop-blur-xl md:w-auto md:gap-12 md:rounded-3xl',
                  isOpen
                    ? 'w-78 lg:w-2/5 lg:shrink-0'
                    : 'w-58 lg:min-w-0 lg:flex-1',
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
                        <h3 className="font-display text-h5-sm md:text-h5">
                          {children}
                        </h3>
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
