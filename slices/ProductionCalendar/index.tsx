import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { createClient } from '@/prismicio'
import { CalendarTable } from './calendar-table'
import { MONTHS, type CalendarRow, type Program } from './months'

export type ProductionCalendarProps =
  SliceComponentProps<Content.ProductionCalendarSlice>

const monthIndex = (month: string | null) =>
  MONTHS.findIndex((name) => month?.startsWith(name))

/** Months covered by a start–end window; wraps past December (Jul → Jan). */
function windowMonths(start: string | null, end: string | null) {
  const from = monthIndex(start)
  const to = monthIndex(end)
  if (from < 0 || to < 0) return []
  const length = ((to - from + 12) % 12) + 1
  return Array.from({ length }, (_, offset) => (from + offset) % 12)
}

/**
 * Header + Conventional/Organic tabs over a country × month grid. Countries
 * and their order come from the slice; harvest windows live on each Country.
 */
const ProductionCalendar = async ({ slice }: ProductionCalendarProps) => {
  const { primary } = slice
  const ids = primary.countries.flatMap(({ country }) =>
    isFilled.contentRelationship(country) ? [country.id] : [],
  )
  const countries = ids.length
    ? await createClient().getAllByIDs<Content.CountryDocument>(ids)
    : []

  const rows = (program: Program): CalendarRow[] =>
    ids.flatMap((id) => {
      const country = countries.find((doc) => doc.id === id)
      if (!country?.data.name) return []
      const active = country.data.harvest_windows
        .filter((window) => (window.program ?? 'Conventional') === program)
        .flatMap((window) => windowMonths(window.start_month, window.end_month))
      return active.length ? [{ name: country.data.name, active }] : []
    })

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container py-18"
    >
      <div className="divider origin-top scale-y-50" />
      <div className="grid-default mt-4 gap-y-12">
        {primary.eyebrow && (
          <p className="font-display text-shoulder col-span-4 md:col-span-6">
            {primary.eyebrow}
          </p>
        )}
        <div className="col-span-4 flex flex-col gap-8 md:col-span-6 md:col-start-7">
          <PrismicRichText
            field={primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-display text-h2-sm md:text-h2">
                  {children}
                </h2>
              ),
            }}
          />
          <div className="text-h6 text-muted max-w-152">
            <PrismicRichText field={primary.description} />
          </div>
        </div>
      </div>

      <CalendarTable
        className="mt-16 md:mt-20"
        programs={{
          Conventional: rows('Conventional'),
          Organic: rows('Organic'),
        }}
        activeLabel={primary.active_label}
        offSeasonLabel={primary.off_season_label}
      />
    </section>
  )
}

export default ProductionCalendar
