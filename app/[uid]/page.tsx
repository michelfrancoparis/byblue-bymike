import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { SliceZone } from '@prismicio/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Inner pages (/farming, /about…) — one Prismic "Page" document each.
export default async function Page({ params }: PageProps<'/[uid]'>) {
  const { uid } = await params
  const page = await getPage(uid)

  return <SliceZone slices={page.data.slices} components={components} />
}

export async function generateMetadata({
  params,
}: PageProps<'/[uid]'>): Promise<Metadata> {
  const { uid } = await params
  const page = await getPage(uid)

  return {
    title: page.data.meta_title || undefined,
    description: page.data.meta_description || undefined,
    openGraph: page.data.meta_image.url
      ? { images: [{ url: page.data.meta_image.url }] }
      : undefined,
  }
}

export async function generateStaticParams() {
  const pages = await createClient().getAllByType('page')
  return pages.map((page) => ({ uid: page.uid }))
}

function getPage(uid: string) {
  return createClient()
    .getByUID('page', uid)
    .catch(() => notFound())
}
