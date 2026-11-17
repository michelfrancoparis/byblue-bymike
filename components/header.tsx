import Link from 'next/link'
import { LogoMark } from '@/components/icons/logo-mark'
import { LogoWordmark } from '@/components/icons/logo-wordmark'
import { MenuIcon } from '@/components/icons/menu'
import { SITE_NAME } from '@/lib/constants'

// Static for now — menu and scroll/page-transition motion come later (Figma annotations).
export function Header() {
  return (
    <header className="inset-x-global fixed top-8 z-50 mx-auto max-w-100">
      <nav className="bg-card text-foreground flex items-center justify-between rounded-2xl px-6 py-4">
        <LogoMark className="h-8 w-auto" />
        <Link href="/" aria-label={`${SITE_NAME} home`}>
          <LogoWordmark className="h-6.5 w-auto" />
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          className="flex size-8 items-center justify-center rounded-xs"
        >
          <MenuIcon className="size-6" />
        </button>
      </nav>
    </header>
  )
}
