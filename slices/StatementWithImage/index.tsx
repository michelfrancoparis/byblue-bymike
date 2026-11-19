import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'

export type StatementWithImageProps =
  SliceComponentProps<Content.StatementWithImageSlice>

/** Divider + eyebrow; big statement over small text on the left, image right. */
const StatementWithImage = ({ slice }: StatementWithImageProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container pt-20 pb-16 md:pt-32 md:pb-24"
    >
      <div className="divider origin-top scale-y-50" />
      {primary.eyebrow && (
        <p className="font-display text-shoulder-sm md:text-shoulder mt-4">
          {primary.eyebrow}
        </p>
      )}

      <div className="grid-default mt-6 gap-y-16 md:mt-16 md:gap-y-12">
        <div className="col-span-4 flex flex-col justify-between gap-4 md:col-span-6 md:gap-12">
          <PrismicRichText
            field={primary.statement}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-display text-h2-sm md:text-h2 max-w-160">
                  {children}
                </h2>
              ),
            }}
          />
          <div className="text-body md:text-h6 text-muted max-w-117">
            <PrismicRichText field={primary.text} />
          </div>
        </div>

        <div className="bg-muted relative col-span-4 aspect-6/7 overflow-hidden rounded-3xl md:col-span-6 md:aspect-auto md:min-h-156 md:rounded-4xl">
          <PrismicNextImage
            field={primary.image}
            fill
            fallbackAlt=""
            sizes="(min-width: 48em) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default StatementWithImage
