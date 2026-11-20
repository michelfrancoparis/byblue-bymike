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
      className="container pt-8 pb-16 md:pt-18 md:pb-24"
    >
      <div className="font-display flex flex-col items-start gap-6 md:items-center md:gap-12 md:text-center">
        {primary.eyebrow && (
          <p className="text-shoulder-sm md:text-shoulder">{primary.eyebrow}</p>
        )}
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
        <div className="bg-primary text-foreground col-span-4 flex flex-col justify-between gap-8 rounded-3xl p-4 md:col-span-6 md:min-h-140.75 md:gap-12 md:rounded-4xl md:p-6">
          <div className="flex flex-col gap-5 md:gap-10">
            <div className="font-display text-h5-sm md:text-lead max-w-155 md:font-sans">
              <PrismicRichText field={primary.intro} />
            </div>

            {primary.groups.map((group, index) => (
              <div key={index} className="flex flex-col gap-4">
                {group.label && (
                  <h3 className="font-display text-caption leading-none md:text-base">
                    {group.label}
                  </h3>
                )}
                <ul className="flex flex-wrap gap-x-1 gap-y-2 md:gap-y-1">
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

        <div className="bg-muted relative order-first col-span-4 h-50 overflow-hidden rounded-3xl md:order-none md:col-span-6 md:h-auto md:min-h-140.75 md:rounded-4xl">
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
