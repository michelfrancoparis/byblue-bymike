'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { MONTHS, type CalendarRow, type Program } from './months'

/** Program tabs + country × month pill grid + legend. */
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
  const rows = programs[current]

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
                  'text-body flex items-center gap-2 rounded-full px-5 py-3.5 leading-none transition-colors',
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

      <div className="mt-8 scrollbar-none overflow-x-auto">
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

      <ul className="text-body mt-7 flex justify-end gap-8">
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
