import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'

export type PageHeroProps = SliceComponentProps<Content.PageHeroSlice>

/**
 * Inner-page hero. Content stays in Prismic so each page can use the same
 * framed image composition with its own copy and photography.
 */
const PageHero = ({ slice }: PageHeroProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="h-svh min-h-150 md:p-2"
    >
      <div className="bg-foreground text-background relative h-full overflow-hidden md:rounded-4xl">
        <PrismicNextImage
          field={primary.image}
          fill
          fallbackAlt=""
          sizes="100vw"
          fetchPriority="high"
          className="object-cover"
        />

        <div
          aria-hidden="true"
          className="page-hero-overlay absolute inset-0"
        />

        <div className="grid-default relative h-full content-end gap-y-4 px-2 pb-10.5 md:gap-y-0 md:p-6">
          <div className="font-display col-span-4 flex flex-col gap-6 md:col-span-8 md:gap-8">
            {primary.eyebrow && (
              <p className="text-shoulder-sm md:text-shoulder">
                {primary.eyebrow}
              </p>
            )}
            <PrismicRichText
              field={primary.title}
              components={{
                heading1: ({ children }) => (
                  <h1 className="text-display-sm md:text-display max-w-225.5 text-balance">
                    {children}
                  </h1>
                ),
              }}
            />
          </div>

          <div className="text-body md:text-h6 col-span-4 self-end md:col-span-3 md:col-start-10 md:max-w-80 md:pb-1.5">
            <PrismicRichText field={primary.description} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageHero
