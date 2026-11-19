import { createClient } from '@/prismicio'
import { SiteNav } from '@/components/site-nav'

/**
 * Site header: the menu links and hover images come from the Prismic
 * "Navigation" document; phone, email and address are reused from "Footer".
 */
export async function Header() {
  const client = createClient()
  const [navigation, footer] = await Promise.all([
    client.getSingle('navigation').catch(() => null),
    client.getSingle('footer').catch(() => null),
  ])

  return (
    <SiteNav
      links={navigation?.data.links ?? []}
      languageLabel={navigation?.data.language_label ?? null}
      phone={footer?.data.phone ?? null}
      email={footer?.data.email ?? null}
      address={footer?.data.address ?? []}
    />
  )
}
