import type { Content, ImageField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'

export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Hero + "system" section as one slice: on scroll (later), the hero image
 * shrinks into the center circle and the side circles appear. Keeping both in
 * one component lets that animation drive a single element.
 */
const Hero = ({ slice }: HeroProps) => {
  const { primary } = slice

  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <section className="bg-foreground relative h-svh overflow-hidden">
        <PrismicNextImage
          field={primary.background_image}
          fill
          fallbackAlt=""
          sizes="100vw"
          fetchPriority="high"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/20" />

        <div className="font-display text-background absolute inset-x-0 bottom-8 container flex flex-col items-center gap-9 text-center">
          {primary.eyebrow && (
            <p className="text-shoulder">{primary.eyebrow}</p>
          )}
          <PrismicRichText
            field={primary.headline}
            components={{
              heading1: ({ children }) => (
                <h1 className="text-display-sm md:text-display text-balance">
                  {children}
                </h1>
              ),
            }}
          />
        </div>
      </section>

      <section className="container pt-22 pb-24">
        <PrismicRichText
          field={primary.system_title}
          components={{
            heading2: ({ children }) => (
              <h2 className="font-display text-h1-sm md:text-h1 mx-auto max-w-204 text-center text-balance">
                {children}
              </h2>
            ),
          }}
        />

        <div className="mx-auto mt-35 flex max-w-300 gap-1.5">
          <Circle image={primary.left_image} label={primary.left_label} />
          <Circle
            image={primary.background_image}
            label={primary.center_label}
          />
          <Circle image={primary.right_image} label={primary.right_label} />
        </div>

        <div className="grid-default mt-24">
          <PrismicRichText
            field={primary.system_text}
            components={{
              // Paints in on scroll later; static dark blue for now.
              paragraph: ({ children }) => (
                <p className="font-display text-h2-sm md:text-h2 col-span-4 md:col-span-8 md:col-start-5">
                  {children}
                </p>
              ),
            }}
          />
        </div>
      </section>
    </div>
  )
}

function Circle({ image, label }: { image: ImageField; label: string | null }) {
  return (
    <div className="bg-muted relative aspect-square flex-1 overflow-hidden rounded-full">
      <PrismicNextImage
        field={image}
        fill
        fallbackAlt=""
        sizes="(min-width: 48em) 25rem, 33vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
      {label && (
        // Hidden until the scroll/hover animation reveals it.
        <span className="bg-lime text-foreground absolute top-1/2 left-1/2 -translate-1/2 rounded-full px-2.5 py-1 text-xs uppercase opacity-0">
          {label}
        </span>
      )}
    </div>
  )
}

export default Hero
