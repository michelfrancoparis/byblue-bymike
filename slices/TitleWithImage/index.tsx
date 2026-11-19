import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'

export type TitleWithImageProps =
  SliceComponentProps<Content.TitleWithImageSlice>

/** Centered eyebrow and big title over a wide, short image. */
const TitleWithImage = ({ slice }: TitleWithImageProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container py-18"
    >
      <div className="font-display flex flex-col items-start gap-6 md:items-center md:gap-12 md:text-center">
        {primary.eyebrow && (
          <p className="text-shoulder-sm md:text-shoulder">{primary.eyebrow}</p>
        )}
        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-h1-sm md:text-h1 max-w-80 md:max-w-244">
                {children}
              </h2>
            ),
          }}
        />
      </div>

      <div className="bg-muted relative mt-16 h-88.5 overflow-hidden rounded-3xl md:mt-24 md:h-100 md:rounded-4xl">
        <PrismicNextImage
          field={primary.image}
          fill
          fallbackAlt=""
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}

export default TitleWithImage
