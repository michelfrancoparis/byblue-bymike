import type { Content, ImageField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { cn } from '@/lib/utils'

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

        <div className="font-display text-background absolute inset-x-0 bottom-25 container flex flex-col items-center gap-6 text-center md:bottom-8 md:gap-9">
          {primary.eyebrow && (
            <p className="text-shoulder-sm md:text-shoulder">
              {primary.eyebrow}
            </p>
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

      <section className="container pt-16 pb-24 md:pt-22">
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

        {/* Mobile: overlapping cluster (two left, one right). Desktop: a row. */}
        <div className="relative mx-auto mt-16 aspect-41/44 max-w-92 md:mt-35 md:flex md:aspect-auto md:max-w-300 md:gap-1.5">
          <Circle
            image={primary.left_image}
            label={primary.left_label}
            className="top-0 left-0"
          />
          <Circle
            image={primary.background_image}
            label={primary.center_label}
            className="top-1/2 left-0"
          />
          <Circle
            image={primary.right_image}
            label={primary.right_label}
            className="top-1/4 right-0"
          />
        </div>

        <div className="grid-default mt-16 md:mt-24">
          <PrismicRichText
            field={primary.system_text}
            components={{
              // Paints in on scroll later; static dark blue for now.
              paragraph: ({ children }) => (
                <p className="font-display text-h5-sm md:text-h2 col-span-4 md:col-span-8 md:col-start-5">
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

function Circle({
  image,
  label,
  className,
}: {
  image: ImageField
  label: string | null
  className?: string
}) {
  return (
    <div
      className={cn(
        'bg-muted absolute aspect-square w-7/13 overflow-hidden rounded-full md:relative md:inset-auto md:w-auto md:flex-1',
        className,
      )}
    >
      <PrismicNextImage
        field={image}
        fill
        fallbackAlt=""
        sizes="(min-width: 48em) 25rem, 54vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
      {label && (
        // Mobile: glass pill, always visible (Figma). Desktop: hidden until the
        // scroll/hover animation reveals it.
        <span className="max-md:photo-card-glass text-background text-shoulder-sm font-display md:bg-lime md:text-foreground absolute top-1/2 left-1/2 flex -translate-1/2 items-center gap-1 rounded-full px-3 py-2.5 md:px-2.5 md:py-1 md:text-xs md:uppercase md:opacity-0">
          <span
            aria-hidden="true"
            className="bg-background size-1.5 rounded-full md:hidden"
          />
          {label}
        </span>
      )}
    </div>
  )
}

export default Hero
