import type { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'
import { createClient } from '@/prismicio'
import { components } from '@/slices'

export default async function Home() {
  const page = await getHomepage()

  return <SliceZone slices={page.data.slices} components={components} />
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage()

  return {
    title: page.data.meta_title || undefined,
    description: page.data.meta_description || undefined,
  }
}

function getHomepage() {
  return createClient().getSingle('homepage')
}
