import type { Content } from '@prismicio/client'
import {
  PrismicImage,
  PrismicRichText,
  type SliceComponentProps,
} from '@prismicio/react'

export type PrinciplesProps = SliceComponentProps<Content.PrinciplesSlice>

/** Divider + eyebrow, title with short text, then a row of icon cards. */
const Principles = ({ slice }: PrinciplesProps) => {
  const { primary } = slice

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

      <div className="mt-17 flex flex-col gap-8">
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
        <div className="text-h6 text-muted max-w-95">
          <PrismicRichText field={primary.description} />
        </div>
      </div>

      <ul className="grid-default mt-24 gap-y-2">
        {primary.cards.map((card, index) => (
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
