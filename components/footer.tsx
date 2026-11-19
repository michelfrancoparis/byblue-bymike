import type { KeyTextField, LinkField } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import type { ReactNode } from 'react'
import { LogoMark } from '@/components/icons/logo-mark'
import { LogoWordmark } from '@/components/icons/logo-wordmark'
import { cn } from '@/lib/utils'
import { createClient } from '@/prismicio'

/** Site footer — all copy and links come from the Prismic "Footer" document. */
export async function Footer() {
  const footer = await createClient()
    .getSingle('footer')
    .catch(() => null)

  if (!footer) return null
  const { data } = footer

  return (
    <footer className="bg-primary text-foreground relative pt-9.5 pb-5">
      <div className="container">
        <div className="grid-default gap-y-12">
          <Column heading={data.contact_label} className="md:col-span-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <PrismicRichText field={data.address} />
              </div>
              <div className="flex flex-col gap-2">
                {data.phone && (
                  <a href={`tel:${data.phone.replace(/\s/g, '')}`}>
                    {data.phone}
                  </a>
                )}
                {data.email && (
                  <a href={`mailto:${data.email}`}>{data.email}</a>
                )}
              </div>
            </div>
          </Column>

          <Column heading={data.navigation_label} className="md:col-span-2">
            <LinkList items={data.navigation} />
          </Column>

          <Column heading={data.social_label} className="md:col-span-2">
            <LinkList items={data.social} />
          </Column>

          <div className="col-span-4 hidden justify-end md:col-span-2 md:flex">
            <LogoMark className="h-19 w-auto" />
          </div>
        </div>

        <LogoWordmark className="mt-24 h-auto w-full md:mt-30" />
      </div>

      <div className="text-caption px-global grid-default absolute inset-x-0 bottom-2">
        <p className="col-span-4 md:col-span-6">{data.copyright}</p>
        {data.legal.map((item, index) => (
          <MaybeLink key={index} field={item.link} className="col-span-2">
            {item.label}
          </MaybeLink>
        ))}
        {data.credit_label && (
          <MaybeLink
            field={data.credit_link}
            className="col-span-4 md:col-span-2 md:text-right"
          >
            {data.credit_label}
          </MaybeLink>
        )}
      </div>
    </footer>
  )
}

function Column({
  heading,
  className,
  children,
}: {
  heading: KeyTextField
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('col-span-4 flex flex-col gap-6', className)}>
      {heading && <h2 className="text-body">{heading}</h2>}
      <div className="text-body-sm">{children}</div>
    </div>
  )
}

function LinkList({
  items,
}: {
  items: { label: KeyTextField; link: LinkField }[]
}) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, index) => (
        <li key={index}>
          <MaybeLink field={item.link}>{item.label}</MaybeLink>
        </li>
      ))}
    </ul>
  )
}

/** Plain text until the editor fills the link in Prismic. */
function MaybeLink({
  field,
  className,
  children,
}: {
  field: LinkField
  className?: string
  children: ReactNode
}) {
  if (isFilled.link(field)) {
    return (
      <PrismicNextLink field={field} className={className}>
        {children}
      </PrismicNextLink>
    )
  }
  return <span className={cn('cursor-pointer', className)}>{children}</span>
}
