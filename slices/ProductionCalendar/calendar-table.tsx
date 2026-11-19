'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { cn } from '@/lib/utils'
import { MONTHS, type CalendarRow, type Program } from './months'

const PAGE = 3

/**
 * Program tabs + country × month pill grid + legend. Mobile: one month at a
 * time — pick it from a 3-month strip, chevrons step through the year.
 */
export function CalendarTable({
  programs,
  activeLabel,
  offSeasonLabel,
  className,
}: {
  programs: Record<Program, CalendarRow[]>
  activeLabel: string | null
  offSeasonLabel: string | null
  className?: string
}) {
  const tabs = (Object.keys(programs) as Program[]).filter(
    (program) => programs[program].length > 0,
  )
  const [current, setCurrent] = useState<Program>(tabs[0] ?? 'Conventional')
  const [month, setMonth] = useState(0)
  const rows = programs[current]
  const pageStart = month - (month % PAGE)
  const step = (by: number) => setMonth((previous) => (previous + by + 12) % 12)

  if (tabs.length === 0) return null

  return (
    <div className={className}>
      {tabs.length > 1 && (
        <div
          role="tablist"
          className="bg-card inline-flex gap-1 rounded-full p-1"
        >
          {tabs.map((program) => {
            const selected = program === current
            return (
              <button
                key={program}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setCurrent(program)}
                className={cn(
                  'text-body-sm md:text-body flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-3.5 leading-none transition-colors md:gap-2',
                  selected ? 'bg-foreground text-card' : 'text-foreground',
                )}
              >
                {selected && (
                  <span className="bg-card size-2 rounded-full" aria-hidden />
                )}
                {program}
              </button>
            )
          })}
        </div>
      )}

      <div className="mt-8 md:hidden">
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => step(-1)}
            className="cursor-pointer"
          >
            <ChevronDownIcon className="rotate-90" />
          </button>
          {MONTHS.slice(pageStart, pageStart + PAGE).map((name, offset) => {
            const index = pageStart + offset
            const selected = index === month
            return (
              <button
                key={name}
                type="button"
                aria-pressed={selected}
                onClick={() => setMonth(index)}
                className={cn(
                  'text-body-sm h-11 flex-1 cursor-pointer rounded-full uppercase transition-colors',
                  selected ? 'bg-foreground/7' : 'opacity-40',
                )}
              >
                {name}
              </button>
            )
          })}
          <button
            type="button"
            aria-label="Next month"
            onClick={() => step(1)}
            className="cursor-pointer"
          >
            <ChevronDownIcon className="-rotate-90" />
          </button>
        </div>
        <ul className="border-primary-muted mt-3 border-t">
          {rows.map((row) => {
            const active = row.active.includes(month)
            return (
              <li
                key={row.name}
                className="border-primary-muted flex h-14.5 items-center gap-4 border-b"
              >
                <span className="text-body w-25 shrink-0 font-medium">
                  {row.name}
                </span>
                <span
                  className={cn(
                    'h-5.5 flex-1 rounded-full transition-colors',
                    active ? 'bg-primary' : 'bg-primary-muted',
                  )}
                >
                  <span className="sr-only">
                    {active ? activeLabel : offSeasonLabel}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="relative mt-8 hidden scrollbar-none overflow-x-auto md:block">
        <table className="w-full min-w-200 table-fixed border-collapse">
          <thead>
            <tr className="border-primary-muted border-b">
              <th className="w-30" />
              {MONTHS.map((month) => (
                <th
                  key={month}
                  scope="col"
                  className="text-body-sm h-11 px-0.5 font-medium uppercase"
                >
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-primary-muted border-b">
                <th
                  scope="row"
                  className="text-body h-14.5 pr-4 text-left font-medium whitespace-nowrap"
                >
                  {row.name}
                </th>
                {MONTHS.map((month, index) => {
                  const active = row.active.includes(index)
                  return (
                    <td key={month} className="px-0.5">
                      <span
                        className={cn(
                          'block h-5.5 rounded-full',
                          active ? 'bg-primary' : 'bg-primary-muted',
                        )}
                      >
                        <span className="sr-only">
                          {active ? activeLabel : offSeasonLabel}
                        </span>
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="text-body mt-7 flex gap-8 md:justify-end">
        {[
          { label: activeLabel, color: 'bg-primary' },
          { label: offSeasonLabel, color: 'bg-primary-muted' },
        ].map(
          ({ label, color }) =>
            label && (
              <li key={label} className="flex items-center gap-2">
                <span className={cn('size-3 rounded-xs', color)} />
                {label}
              </li>
            ),
        )}
      </ul>
    </div>
  )
}
