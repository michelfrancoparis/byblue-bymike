import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { PortfolioViewer, type VarietyItem } from './portfolio-viewer'

export type VarietyPortfolioProps =
  SliceComponentProps<Content.VarietyPortfolioSlice>

/**
 * Title + text, a family filter (only when there is more than one family),
 * a sliding row of variety cards with details, and a partner banner.
 * Varieties and their order are picked from the Variety collection.
 */
const VarietyPortfolio = ({ slice }: VarietyPortfolioProps) => {
  const { primary } = slice
  const varieties: VarietyItem[] = primary.varieties.flatMap(({ variety }) =>
    isFilled.contentRelationship(variety) && variety.data?.name
      ? [
          {
            id: variety.id,
            name: variety.data.name,
            family: variety.data.family ?? 'Blueberries',
            size: variety.data.size ?? null,
            code: variety.data.code ?? null,
            image: variety.data.image,
            description: variety.data.description,
            plantSpecs: variety.data.plant_specs.map(({ label, value }) => ({
              label: label ?? '',
              value: value ?? '',
            })),
            fruitSpecs: variety.data.fruit_specs.map(({ label, value }) => ({
              label: label ?? '',
              value: value ?? '',
            })),
          },
        ]
      : [],
  )

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container py-18"
    >
      <div className="grid-default gap-y-8">
        <div className="font-display col-span-4 flex flex-col gap-12 md:col-span-6">
          {primary.eyebrow && (
            <p className="text-shoulder-sm md:text-shoulder">
              {primary.eyebrow}
            </p>
          )}
          <PrismicRichText
            field={primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-h2-sm md:text-h2 max-w-126">{children}</h2>
              ),
            }}
          />
        </div>
        <div className="text-body md:text-h6 text-muted col-span-4 flex max-w-146 flex-col gap-6 md:col-span-5 md:col-start-8 md:pt-14">
          <PrismicRichText field={primary.description} />
        </div>
      </div>

      <PortfolioViewer
        varieties={varieties}
        allLabel={primary.all_label ?? 'All'}
        className="mt-16 md:mt-24"
      />

      {(isFilled.image(primary.partner_logo) ||
        isFilled.richText(primary.partner_text)) && (
        <div className="bg-primary mt-4 flex flex-col items-center justify-center gap-5 rounded-4xl px-6 pt-4 pb-3 text-center sm:flex-row sm:text-left">
          {isFilled.image(primary.partner_logo) && (
            <PrismicNextImage
              field={primary.partner_logo}
              className="h-11 w-auto"
              sizes="10rem"
            />
          )}
          <div className="text-body-sm text-muted">
            <PrismicRichText field={primary.partner_text} />
          </div>
        </div>
      )}
    </section>
  )
}

export default VarietyPortfolio
