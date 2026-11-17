import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

// Body / UI. Placeholder until General Sans (Fontshare) files arrive — swap this
// instance for a localFont, keeping `variable: '--font-body-family'`.
export const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body-family',
})

// Headings / display — Haffer XH Medium (the only weight the design uses).
export const fontDisplay = localFont({
  src: '../assets/fonts/HafferXH-Medium.woff2',
  weight: '500',
  display: 'swap',
  variable: '--font-display-family',
})
