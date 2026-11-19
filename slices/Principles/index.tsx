import type { Content } from '@prismicio/client'
import {
  PrismicImage,
  PrismicRichText,
  type SliceComponentProps,
} from '@prismicio/react'
import { cn } from '@/lib/utils'

export type PrinciplesProps = SliceComponentProps<Content.PrinciplesSlice>

/**
 * Divider + eyebrow, title with short text, then a row of icon cards.
 * Default: text under the title, 3 cards with one line each.
 * Cards with titles: text beside the title, 4 taller cards with title + text.
 */
const Principles = ({ slice }: PrinciplesProps) => {
  const { primary } = slice
  const withTitles = slice.variation === 'cardsWithTitles'

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container py-18"
    >
      <div className="divider origin-top scale-y-50" />
      {primary.eyebrow && (
        <p className="font-display text-shoulder mt-4">{primary.eyebrow}</p>
      )}

      <div
        className={cn(
          'mt-17',
          withTitles ? 'grid-default items-end gap-y-8' : 'flex flex-col gap-8',
        )}
      >
        <div className={cn(withTitles && 'col-span-4 md:col-span-6')}>
          <PrismicRichText
            field={primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-display text-h2-sm md:text-h2 max-w-117">
                  {children}
                </h2>
              ),
            }}
          />
        </div>
        <div
          className={cn(
            'text-h6 text-muted',
            withTitles ? 'col-span-4 max-w-92 md:col-start-7' : 'max-w-100',
          )}
        >
          <PrismicRichText field={primary.description} />
        </div>
      </div>

      <ul className="grid-default mt-24 gap-y-2">
        {slice.variation === 'cardsWithTitles'
          ? slice.primary.cards.map((card, index) => (
              <li
                key={index}
                className="bg-primary col-span-4 flex flex-col justify-between gap-12 rounded-4xl p-6 md:col-span-3 md:h-89"
              >
                <div className="flex flex-col gap-12 md:gap-24">
                  {card.icon.url && (
                    <PrismicImage
                      field={card.icon}
                      className="h-13 w-auto self-start"
                    />
                  )}
                  <PrismicRichText
                    field={card.title}
                    components={{
                      heading3: ({ children }) => (
                        <h3 className="font-display text-h5 max-w-75">
                          {children}
                        </h3>
                      ),
                    }}
                  />
                </div>
                <div className="text-body">
                  <PrismicRichText field={card.text} />
                </div>
              </li>
            ))
          : slice.primary.cards.map((card, index) => (
              <li
                key={index}
                className="bg-primary col-span-4 flex flex-col gap-10 rounded-4xl py-8 pr-6 pl-8"
              >
                {card.icon.url && (
                  <PrismicImage
                    field={card.icon}
                    className="h-13 w-auto self-start"
                  />
                )}
                <div className="font-display text-h5 max-w-83">
                  <PrismicRichText field={card.text} />
                </div>
              </li>
            ))}
      </ul>
    </section>
  )
}

export default Principles
