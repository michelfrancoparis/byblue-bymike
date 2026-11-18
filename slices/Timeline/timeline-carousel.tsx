'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import type { ImageField, RichTextField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

type Milestone = {
  image: ImageField
  title: RichTextField
  description: RichTextField
}

const DEFAULT_AUTOPLAY_INTERVAL = 6

export function TimelineCarousel({
  milestones,
  autoplayInterval,
}: {
  milestones: Milestone[]
  autoplayInterval: number | null
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const interval = Math.max(autoplayInterval ?? DEFAULT_AUTOPLAY_INTERVAL, 1)

  useGSAP(
    (_, contextSafe) => {
      if (milestones.length < 2 || isPaused) return

      const advance = contextSafe!(() => {
        setActiveIndex((index) => (index + 1) % milestones.length)
      })
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const timer = gsap.delayedCall(interval, function repeat() {
          advance()
          timer.restart(true)
        })

        return () => timer.kill()
      })

      return () => media.revert()
    },
    { dependencies: [interval, isPaused, milestones.length], scope: stageRef },
  )

  useGSAP(
    (_, contextSafe) => {
      const stage = stageRef.current
      const track = trackRef.current
      const activeCard = cardRefs.current[activeIndex]

      if (!stage || !track || !activeCard) return

      const alignActiveCard = contextSafe!((immediate = false) => {
        const targetX =
          stage.clientWidth / 2 -
          (activeCard.offsetLeft + activeCard.offsetWidth / 2)

        gsap[immediate ? 'set' : 'to'](track, {
          x: targetX,
          duration: immediate ? 0 : 0.7,
          ease: 'power3.inOut',
          overwrite: 'auto',
        })
      })

      alignActiveCard(activeIndex === 0)

      const resizeObserver = new ResizeObserver(() => alignActiveCard(true))
      resizeObserver.observe(stage)

      return () => resizeObserver.disconnect()
    },
    {
      dependencies: [activeIndex, milestones.length],
      scope: stageRef,
      revertOnUpdate: true,
    },
  )

  if (milestones.length === 0) return null

  return (
    <div
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        ref={stageRef}
        className="relative aspect-3/2 overflow-hidden md:aspect-auto md:h-118"
      >
        <ul ref={trackRef} className="timeline-track">
          {milestones.map((milestone, index) => {
            const isActive = index === activeIndex
            const isNext =
              (index - activeIndex + milestones.length) % milestones.length ===
              1

            return (
              <li
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                className={cn(
                  'relative aspect-3/2 shrink-0 overflow-hidden',
                  isActive ? 'w-full rounded-4xl md:w-177' : 'hidden md:block',
                  !isActive && isNext && 'md:w-75 md:rounded-3xl',
                  !isActive && !isNext && 'md:w-62.5 md:rounded-2xl',
                )}
              >
                <PrismicNextImage
                  field={milestone.image}
                  fill
                  fallbackAlt=""
                  sizes={
                    isActive ? '(min-width: 48em) 44.25rem, 100vw' : '18.75rem'
                  }
                  className="object-cover"
                />

                {isActive && (
                  <div className="timeline-card-copy text-card absolute right-3 bottom-3 left-3 flex min-h-37.75 w-auto flex-col gap-6 rounded-2xl p-4 md:w-94">
                    <PrismicRichText
                      field={milestone.title}
                      components={{
                        heading3: ({ children }) => (
                          <h3 className="font-display text-h5 before:bg-lime flex items-center gap-2 before:size-3 before:shrink-0 before:rounded-full before:content-['']">
                            {children}
                          </h3>
                        ),
                      }}
                    />
                    <div className="text-body">
                      <PrismicRichText field={milestone.description} />
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-6 flex justify-center gap-1.5">
        {milestones.map((milestone, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              'bg-foreground/30 size-2 rounded-full transition-all',
              index === activeIndex && 'bg-foreground w-6',
            )}
            aria-label={`Show milestone ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
