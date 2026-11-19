import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { ActionLink } from '@/components/ui/action-link'

export type ClosingProps = SliceComponentProps<Content.ClosingSlice>

/**
 * Page closer, same on every page. Later: scroll-triggered reveal into the
 * footer, with the image on a parallax layer.
 */
const Closing = ({ slice }: ClosingProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-primary h-svh min-h-150 p-2"
    >
      <div className="bg-foreground text-background relative flex h-full flex-col items-start justify-start gap-6 overflow-hidden rounded-4xl px-3 py-8 md:items-center md:justify-center md:gap-0 md:p-0">
        <PrismicNextImage
          field={primary.image}
          fill
          fallbackAlt=""
          sizes="100vw"
          className="object-cover"
        />
        {primary.darken_image && (
          <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        )}

        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="font-display text-display-sm md:text-display relative max-w-344 md:text-center">
                {children}
              </h2>
            ),
          }}
        />

        <div className="relative flex flex-col items-start gap-8 md:absolute md:right-0 md:bottom-0 md:p-6">
          <div className="font-display text-h5-sm md:text-h6 max-w-117 md:font-sans">
            <PrismicRichText field={primary.text} />
          </div>
          <ActionLink field={primary.link} variant="light" />
        </div>
      </div>
    </section>
  )
}

export default Closing
