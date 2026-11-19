import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { cn } from '@/lib/utils'

export type PhaseTimelineProps = SliceComponentProps<Content.PhaseTimelineSlice>

/**
 * Centered title, then phases zig-zagging left/right, joined by a line with
 * rounded corners from one photo to the next. Stacked on mobile.
 * Later: the line draws itself on scroll (Figma motion).
 */
const PhaseTimeline = ({ slice }: PhaseTimelineProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container py-18 md:pt-40"
    >
      <div className="font-display flex flex-col items-center gap-12 text-center">
        {primary.eyebrow && (
          <p className="text-shoulder-sm md:text-shoulder">{primary.eyebrow}</p>
        )}
        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-h1-sm md:text-h1 max-w-310 text-balance">
                {children}
              </h2>
            ),
          }}
        />
      </div>

      <ol className="mt-16 flex flex-col gap-12 md:mt-24 lg:gap-0">
        {primary.phases.map((phase, index) => {
          const right = index % 2 === 1
          return (
            <li key={index}>
              {index > 0 && <Connector toRight={right} />}
              <div className="grid-default">
                <div
                  className={cn(
                    'col-span-4 flex flex-col gap-6 sm:flex-row md:col-span-12 lg:col-span-6 xl:col-span-5',
                    right ? 'lg:col-start-7 xl:col-start-8' : 'lg:col-start-2',
                  )}
                >
                  <div className="bg-muted relative aspect-square w-full max-w-68 shrink-0 overflow-hidden rounded-4xl sm:size-68">
                    <PrismicNextImage
                      field={phase.image}
                      fill
                      fallbackAlt=""
                      sizes="17rem"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col items-start justify-between gap-8 py-2">
                    {phase.tag && (
                      <p className="bg-primary text-body-sm rounded-full px-4 py-3 leading-none">
                        {phase.tag}
                      </p>
                    )}
                    <div className="flex flex-col gap-4">
                      {phase.title && (
                        <h3 className="font-display text-h3 leading-tight">
                          {phase.title}
                        </h3>
                      )}
                      {phase.text && (
                        <p className="text-body-sm text-muted max-w-71">
                          {phase.text}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/**
 * Line from the centre of the previous photo to the centre of the next one:
 * down, across, down. Photos start at column 2 (left) or 7/8 (right, lg/xl)
 * and are 17rem wide, so their centres sit 8.5rem in. Zig-zag from lg up.
 */
function Connector({ toRight }: { toRight: boolean }) {
  return (
    <div aria-hidden="true" className="grid-default hidden lg:grid">
      <div className="relative col-start-2 col-end-7 h-34 xl:col-end-8">
        <div className="absolute inset-y-0 -right-36 left-34">
          <div
            className={cn(
              'border-foreground absolute top-0 bottom-1/2 w-1/2 border-b',
              toRight
                ? 'left-0 rounded-bl-3xl border-l'
                : 'right-0 rounded-br-3xl border-r',
            )}
          />
          <div
            className={cn(
              'border-foreground absolute top-1/2 bottom-0 -mt-px w-1/2 border-t',
              toRight
                ? 'right-0 rounded-tr-3xl border-r'
                : 'left-0 rounded-tl-3xl border-l',
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default PhaseTimeline
