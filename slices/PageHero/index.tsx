import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'

export type PageHeroProps = SliceComponentProps<Content.PageHeroSlice>

/** Inner-page hero: framed full-screen image, title bottom-left, text bottom-right. */
const PageHero = ({ slice }: PageHeroProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="h-svh min-h-150 p-2"
    >
      <div className="bg-foreground text-background relative flex h-full flex-col justify-end gap-12 overflow-hidden rounded-4xl p-6 md:grid md:grid-cols-12 md:items-end md:gap-2 md:p-8 md:pr-0">
        <PrismicNextImage
          field={primary.image}
          fill
          fallbackAlt=""
          sizes="100vw"
          fetchPriority="high"
          className="object-cover"
        />

        <div className="font-display relative flex flex-col gap-9 md:col-span-7">
          {primary.eyebrow && (
            <p className="text-shoulder">{primary.eyebrow}</p>
          )}
          <PrismicRichText
            field={primary.title}
            components={{
              heading1: ({ children }) => (
                <h1 className="text-display-sm md:text-display max-w-201">
                  {children}
                </h1>
              ),
            }}
          />
        </div>

        <div className="text-h6 relative max-w-117 md:col-span-4 md:col-start-9 md:pb-1">
          <PrismicRichText field={primary.description} />
        </div>
      </div>
    </section>
  )
}

export default PageHero
