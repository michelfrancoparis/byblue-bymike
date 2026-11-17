import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { BASE_URL, SITE_NAME } from '@/lib/constants'
import { fontBody, fontDisplay } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { repositoryName } from '@/prismicio'
import '@/styles/globals.css'
import { PrismicPreview } from '@prismicio/next'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  metadataBase: new URL(BASE_URL),
}

export const viewport = {
  themeColor: '#f3edde',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={cn(fontBody.variable, fontDisplay.variable)}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  )
}
