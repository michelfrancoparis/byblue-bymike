'use client'

import { useGSAP } from '@gsap/react'
import type { Content, RichTextField } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import gsap from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { CloseIcon } from '@/components/icons/close'
import { GlobeIcon } from '@/components/icons/globe'
import { LogoMark } from '@/components/icons/logo-mark'
import { LogoWordmark } from '@/components/icons/logo-wordmark'
import { MenuIcon } from '@/components/icons/menu'
import { SITE_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

type NavLink = Content.NavigationDocumentDataLinksItem

/**
 * Pill nav that opens into the menu panel. Open: grows in width at the same
 * height, then down; the panel content sits still and is revealed by the
 * growing edges (mask) while it fades in. Close plays it backwards.
 */
export function SiteNav({
  links,
  languageLabel,
  phone,
  email,
  address,
}: {
  links: NavLink[]
  languageLabel: string | null
  phone: string | null
  email: string | null
  address: RichTextField
}) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline>(null)
  const pathname = usePathname()

  // Build the open timeline from the closed layout; rebuilt on resize so the
  // target width/height follow the screen.
  useGSAP(
    () => {
      const nav = navRef.current
      const panel = panelRef.current
      if (!nav || !panel) return

      const build = () => {
        const primary = getComputedStyle(nav).getPropertyValue('--primary')
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: 'power3.inOut' },
        })
        tl.set(nav, { width: nav.offsetWidth, maxWidth: 'none' })
          .to(nav, {
            width: () => panel.offsetWidth,
            borderRadius: '2rem',
            backgroundColor: primary,
            duration: 0.45,
          })
          .to(nav, {
            height: () => panel.offsetTop + panel.offsetHeight,
            duration: 0.5,
          })
          .to(
            panel,
            { opacity: 1, duration: 0.35, ease: 'power1.out' },
            '-=0.3',
          )
        return tl
      }

      timeline.current = build()

      const onResize = () => {
        const tl = timeline.current
        if (!tl) return
        const progress = tl.progress()
        const reversed = tl.reversed()
        tl.progress(0).kill()
        timeline.current = build().progress(progress)
        if (progress > 0 && progress < 1) {
          if (reversed) timeline.current.reverse()
          else timeline.current.play()
        }
      }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    },
    { scope: navRef },
  )

  useEffect(() => {
    const tl = timeline.current
    if (!tl) return
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (open) {
      if (reduceMotion) tl.progress(1)
      else tl.play()
    } else {
      if (reduceMotion) tl.progress(0)
      else tl.reverse()
    }
  }, [open])

  const toggle = (next: boolean) => {
    setOpen(next)
    setHovered(null)
  }

  // Close when the page changes (state derived during render, not an effect).
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    toggle(false)
  }

  // Close on Escape or a click outside the nav.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') toggle(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) toggle(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <header className="inset-x-global pointer-events-none fixed top-8 z-50 flex justify-center">
      <nav
        ref={navRef}
        aria-label="Main"
        className="bg-card text-foreground pointer-events-auto relative w-full max-w-100 overflow-hidden rounded-2xl"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <LogoMark className="h-8 w-auto" />
          <Link href="/" aria-label={`${SITE_NAME} home`}>
            <LogoWordmark className="h-6.5 w-auto" />
          </Link>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => toggle(!open)}
            className={cn(
              'flex size-8 items-center justify-center rounded-lg transition-colors',
              open
                ? 'hover:bg-foreground-hover hover:text-card'
                : 'hover:bg-primary',
            )}
          >
            {open ? (
              <CloseIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </button>
        </div>

        <div
          ref={panelRef}
          id="site-menu"
          inert={!open}
          className="nav-panel-width absolute top-16 left-1/2 flex -translate-x-1/2 flex-col gap-16 px-6 pt-14 pb-6 opacity-0"
        >
          <div className="flex items-start justify-between gap-8">
            <ul onPointerLeave={() => setHovered(null)}>
              {links.map((item, index) => (
                <li key={index}>
                  <MenuLink
                    item={item}
                    active={hovered === index}
                    onActivate={() => setHovered(index)}
                    onNavigate={() => toggle(false)}
                  />
                </li>
              ))}
            </ul>

            <div className="relative hidden aspect-100/69 w-full max-w-100 overflow-hidden rounded-xl md:block">
              {links.map((item, index) => (
                <PrismicNextImage
                  key={index}
                  field={item.image}
                  fill
                  fallbackAlt=""
                  sizes="25rem"
                  className={cn(
                    'object-cover transition-opacity duration-300',
                    hovered === index ? 'opacity-100' : 'opacity-0',
                  )}
                />
              ))}
            </div>
          </div>

          <div className="text-body-sm flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-wrap gap-x-12 gap-y-3">
              <div className="flex flex-col gap-3">
                {phone && (
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                )}
                {email && <a href={`mailto:${email}`}>{email}</a>}
              </div>
              <div className="flex flex-col gap-3">
                <PrismicRichText field={address} />
              </div>
            </div>

            {languageLabel && (
              <span className="flex cursor-pointer items-center gap-1 rounded-full border border-current px-3.5 py-3 leading-none">
                <GlobeIcon className="size-5" />
                {languageLabel}
                <ChevronDownIcon className="h-5 w-3" />
              </span>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

/** Big menu link with a dot on hover/focus; plain text until it has a destination. */
function MenuLink({
  item,
  active,
  onActivate,
  onNavigate,
}: {
  item: NavLink
  active: boolean
  onActivate: () => void
  onNavigate: () => void
}) {
  const className =
    'font-display text-h3 flex items-center gap-2 py-4 leading-none'
  const content = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'bg-foreground size-4 shrink-0 rounded-full',
          !active && 'hidden',
        )}
      />
      {item.label}
    </>
  )

  return isFilled.link(item.link) ? (
    <PrismicNextLink
      field={item.link}
      className={className}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      onClick={onNavigate}
    >
      {content}
    </PrismicNextLink>
  ) : (
    <span
      className={cn(className, 'cursor-pointer')}
      onPointerEnter={onActivate}
    >
      {content}
    </span>
  )
}
