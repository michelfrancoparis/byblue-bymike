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
 * Compact cards: text beside the title, small icon + label cards, 3 per row.
 */
const Principles = ({ slice }: PrinciplesProps) => {
  const { primary } = slice
  const withTitles = slice.variation === 'cardsWithTitles'
  const compact = slice.variation === 'compactCards'
  const beside = withTitles || compact

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

      <div
        className={cn(
          'mt-6 md:mt-17',
          beside
            ? 'grid-default gap-y-4 md:gap-y-8'
            : 'flex flex-col gap-4 md:gap-8',
          withTitles && 'items-end',
        )}
      >
        <div className={cn(beside && 'col-span-4 md:col-span-6')}>
          <PrismicRichText
            field={primary.title}
            components={{
              heading2: ({ children }) => (
                <h2
                  className={cn(
                    'font-display text-h2-sm md:text-h2 max-w-117',
                    compact && 'max-md:text-balance',
                  )}
                >
                  {children}
                </h2>
              ),
            }}
          />
        </div>
        <div
          className={cn(
            'text-body md:text-h6 text-muted',
            withTitles && 'col-span-4 max-w-92 md:col-start-7',
            compact && 'col-span-4 max-w-109 md:col-start-9',
            !beside && 'max-w-100',
          )}
        >
          <PrismicRichText field={primary.description} />
        </div>
      </div>

      <ul
        className={cn(
          'grid-default mt-24 gap-y-2',
          compact && 'mt-16 md:mt-24',
          // Mobile: cards slide sideways, one at a time (Figma).
          (withTitles || slice.variation === 'default') &&
            '-mx-global px-global mt-16 flex snap-x snap-mandatory scroll-px-2 scrollbar-none gap-2 overflow-x-auto md:mx-0 md:mt-24 md:grid md:overflow-visible md:px-0',
        )}
      >
        {slice.variation === 'compactCards' &&
          slice.primary.cards.map((card, index) => (
            <li
              key={index}
              className="bg-primary col-span-4 flex min-h-19 items-center gap-5 rounded-3xl px-6 py-4 md:col-span-6 md:min-h-0 md:flex-col md:items-start md:gap-10 md:rounded-4xl md:p-6 lg:col-span-4"
            >
              {card.icon.url && (
                <PrismicImage
                  field={card.icon}
                  className="h-auto w-8 shrink-0 md:h-13 md:w-auto"
                />
              )}
              {card.label && (
                <h3 className="font-display text-h4-sm md:text-h5">
                  {card.label}
                </h3>
              )}
            </li>
          ))}
        {slice.variation === 'cardsWithTitles'
          ? slice.primary.cards.map((card, index) => (
              <li
                key={index}
                className="bg-primary col-span-4 flex min-h-88.5 w-78 shrink-0 snap-start flex-col justify-between gap-12 rounded-3xl p-6 md:col-span-6 md:min-h-89 md:w-auto md:rounded-4xl lg:col-span-3"
              >
                <div className="flex flex-col gap-24">
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
                        <h3 className="font-display text-h2-sm md:text-h5 max-w-75">
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
          : slice.variation === 'default' &&
            slice.primary.cards.map((card, index) => (
              <li
                key={index}
                className="bg-primary col-span-4 flex min-h-56.75 w-70 shrink-0 snap-start flex-col justify-between gap-10 rounded-3xl p-6 md:min-h-0 md:w-auto md:justify-start md:rounded-4xl md:py-8 md:pr-6 md:pl-8"
              >
                {card.icon.url && (
                  <PrismicImage
                    field={card.icon}
                    className="h-13 w-auto self-start"
                  />
                )}
                <div className="font-display text-h5-sm md:text-h5 max-w-83">
                  <PrismicRichText field={card.text} />
                </div>
              </li>
            ))}
      </ul>
    </section>
  )
}

export default Principles
