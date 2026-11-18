import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { ActionLink } from '@/components/ui/action-link'

export type CertificationsProps =
  SliceComponentProps<Content.CertificationsSlice>

/** Centered title; card with text, grouped certification tags and a button, beside an image. */
const Certifications = ({ slice }: CertificationsProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container pt-18 pb-24"
    >
      <div className="font-display flex flex-col items-center gap-12 text-center">
        {primary.eyebrow && <p className="text-shoulder">{primary.eyebrow}</p>}
        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-h1-sm md:text-h1 max-w-244 text-balance">
                {children}
              </h2>
            ),
          }}
        />
      </div>

      <div className="grid-default mt-16 gap-y-2 md:mt-30">
        <div className="bg-primary text-foreground col-span-4 flex flex-col justify-between gap-12 rounded-4xl p-6 md:col-span-6 md:h-140.75">
          <div className="flex flex-col gap-10">
            <div className="text-lead-sm md:text-lead max-w-155">
              <PrismicRichText field={primary.intro} />
            </div>

            {primary.groups.map((group, index) => (
              <div key={index} className="flex flex-col gap-4">
                {group.label && (
                  <h3 className="font-display text-base leading-none">
                    {group.label}
                  </h3>
                )}
                <ul className="flex flex-wrap gap-1">
                  {group.certifications.map((certification, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-body-sm rounded-full border border-current px-3 py-2 leading-none uppercase"
                    >
                      {certification.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <ActionLink field={primary.link} />
        </div>

        <div className="bg-muted relative col-span-4 aspect-square overflow-hidden rounded-4xl md:col-span-6 md:aspect-auto md:h-140.75">
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

export default Certifications
