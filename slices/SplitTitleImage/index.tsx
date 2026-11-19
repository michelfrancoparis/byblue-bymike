import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'

export type SplitTitleImageProps =
  SliceComponentProps<Content.SplitTitleImageSlice>

/**
 * Light blue screen: one word left, one word right, an image cut to the
 * greenhouse shape between them and a short text below.
 * Later: scroll transition that shrinks the hero image into this mask.
 */
const SplitTitleImage = ({ slice }: SplitTitleImageProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-primary flex min-h-svh items-center py-24"
    >
      <div className="container grid items-center gap-x-2 gap-y-12 text-center md:grid-cols-3 md:gap-y-16">
        <h2 className="font-display text-h1-sm md:text-h1 md:contents">
          <span className="md:col-start-1 md:row-start-1">
            {primary.title_left}
          </span>{' '}
          <span className="md:col-start-3 md:row-start-1">
            {primary.title_right}
          </span>
        </h2>

        <div className="mask-greenhouse relative mx-auto aspect-47/35 w-full max-w-117.5 md:col-start-2 md:row-start-1">
          <PrismicNextImage
            field={primary.image}
            fill
            fallbackAlt=""
            sizes="(min-width: 48em) 30rem, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-transparent from-40% to-black/60"
          />
        </div>

        <div className="text-body md:text-h6 mx-auto max-w-117.5 md:col-start-2 md:row-start-2">
          <PrismicRichText field={primary.description} />
        </div>
      </div>
    </section>
  )
}

export default SplitTitleImage
