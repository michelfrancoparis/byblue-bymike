import type { Content, ImageField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { cn } from '@/lib/utils'
import { HeroMotion } from './hero-motion'

export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Homepage hero + "system" section as one pinned stage, driven by HeroMotion:
 * preloader → hero → (scroll) framed hero with intro text → the hero image
 * flies into the center circle of a row → the three circles regroup into a
 * cluster with labels. Empty `data-slot` boxes mark where things land; the
 * animation measures them, so each layout lives in CSS, per breakpoint.
 */
const Hero = ({ slice }: HeroProps) => {
  const { primary } = slice

  return (
    <HeroMotion
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Final layout, in normal flow: it gives the stage its height and is
          what stays on screen when the pin ends. */}
      <div className="container pt-50 pb-16 md:pt-32 md:pb-24">
        <div className="grid-default">
          <div className="col-span-4 md:col-span-8 md:col-start-5">
            <div
              data-cluster
              className="relative mx-auto aspect-41/44 max-w-92 md:mx-0 md:w-140 md:max-w-none"
            >
              <div
                data-slot="cluster-left"
                className="absolute top-0 left-0 aspect-square w-7/13"
              />
              <div
                data-slot="cluster-center"
                className="absolute top-1/2 left-0 aspect-square w-7/13"
              />
              <div
                data-slot="cluster-right"
                className="absolute top-1/4 right-0 aspect-square w-7/13"
              />
            </div>
          </div>
          <div
            data-system-text
            className="invisible col-span-4 mt-8 md:col-span-8 md:col-start-5 md:mt-32"
          >
            <PrismicRichText
              field={primary.system_text}
              components={{
                // Paints in on scroll later; static dark blue for now.
                paragraph: ({ children }) => (
                  <p className="font-display text-h5-sm md:text-h2">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        </div>
      </div>

      {/* Preloader backdrop + the two dots that join the hero circle. */}
      <div
        data-preloader
        aria-hidden="true"
        className="bg-primary absolute inset-x-0 top-0 h-svh"
      >
        <span
          data-dot
          className="bg-foreground invisible absolute top-1/2 left-1/2 -mt-12.5 -ml-12.5 size-25 rounded-full"
          style={{
            transform: 'translate(-2.6875rem, -3.09375rem) scale(0.25)',
          }}
        />
        <span
          data-dot
          className="bg-foreground invisible absolute top-1/2 left-1/2 -mt-12.5 -ml-12.5 size-25 rounded-full"
          style={{ transform: 'translate(-2.6875rem, 3.09375rem) scale(0.25)' }}
        />
      </div>

      {/* The hero image: starts as the preloader's third dot, fills the
          screen, gets framed, then travels into the center circle. */}
      <div
        data-media
        className="preloader-clip invisible absolute top-0 left-0 h-svh w-full overflow-hidden"
      >
        <div
          data-media-image
          className="absolute inset-0"
          style={{ transform: 'scale(1.12)' }}
        >
          <PrismicNextImage
            field={primary.background_image}
            fill
            fallbackAlt=""
            sizes="100vw"
            fetchPriority="high"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        </div>
        <div
          data-media-cover
          aria-hidden="true"
          className="bg-foreground absolute inset-0"
        />
        <Label text={primary.center_label} />
      </div>

      {/* Hero copy and the intro text that replaces it on the first scroll. */}
      <div data-hero-layer className="absolute inset-x-0 top-0 h-svh">
        <div
          data-slot="inset"
          className="absolute inset-3 rounded-3xl md:inset-2 md:rounded-4xl"
        />

        <div
          data-hero-copy
          className="font-display text-background absolute inset-x-0 bottom-25 container md:bottom-8"
        >
          <div
            data-hero-copy-in
            className="invisible flex flex-col items-center gap-6 text-center md:gap-9"
          >
            {primary.eyebrow && (
              <p className="text-shoulder-sm md:text-shoulder">
                {primary.eyebrow}
              </p>
            )}
            <PrismicRichText
              field={primary.headline}
              components={{
                heading1: ({ children }) => (
                  <h1 className="text-display-sm md:text-display text-balance">
                    {children}
                  </h1>
                ),
              }}
            />
          </div>
        </div>

        <div className="absolute inset-0 container flex items-center justify-center">
          <div
            data-intro
            className="font-display text-background text-h1-sm md:text-h3 invisible max-w-91.5 text-center md:max-w-202"
          >
            <PrismicRichText field={primary.intro_text} />
          </div>
        </div>
      </div>

      {/* Title + row of circles. Starts one screen below and slides up as if
          scrolled; the hero image passes behind the title on its way in. */}
      <div
        data-row-layer
        className="absolute inset-x-0 top-0 h-svh"
        style={{ transform: 'translateY(100%)' }}
      >
        <div className="container flex h-full flex-col items-center justify-center gap-27 md:gap-37">
          <div data-title>
            <PrismicRichText
              field={primary.system_title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="font-display text-h1-sm md:text-h1 mx-auto max-w-204 text-center text-balance">
                    {children}
                  </h2>
                ),
              }}
            />
          </div>
          <div className="flex w-full max-w-91.5 gap-0.5 md:max-w-300 md:gap-1.5">
            <div data-slot="row-left" className="aspect-square flex-1" />
            <div data-slot="row-center" className="aspect-square flex-1" />
            <div data-slot="row-right" className="aspect-square flex-1" />
          </div>
        </div>

        <Circle
          side="left"
          image={primary.left_image}
          label={primary.left_label}
        />
        <Circle
          side="right"
          image={primary.right_image}
          label={primary.right_label}
        />
      </div>
    </HeroMotion>
  )
}

function Circle({
  side,
  image,
  label,
}: {
  side: 'left' | 'right'
  image: ImageField
  label: string | null
}) {
  return (
    <div
      data-circle={side}
      className="bg-muted invisible absolute top-0 left-0 overflow-hidden rounded-full"
    >
      <PrismicNextImage
        field={image}
        fill
        fallbackAlt=""
        sizes="(min-width: 48em) 25rem, 54vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
      <Label text={label} />
    </div>
  )
}

/** Glass pill with a dot (Figma "Nav.link"); fades in once the cluster forms. */
function Label({ text }: { text: string | null }) {
  if (!text) return null

  return (
    <span
      data-label
      className={cn(
        'photo-card-glass text-background font-display invisible absolute top-1/2 left-1/2 flex -translate-1/2 items-center gap-1 rounded-full px-3 py-2.5 whitespace-nowrap',
        'text-shoulder-sm md:text-h5 md:gap-2 md:px-4 md:py-3.5',
      )}
    >
      <span
        aria-hidden="true"
        className="bg-background size-1.5 rounded-full md:size-3"
      />
      {text}
    </span>
  )
}

export default Hero
