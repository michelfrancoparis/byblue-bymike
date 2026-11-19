import type { Content } from '@prismicio/client'
import { asDate } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { cn } from '@/lib/utils'
import { createClient } from '@/prismicio'

export type NewsProps = SliceComponentProps<Content.NewsSlice>

// Design cap — every entry links out, so the row stays a short "featured" strip.
const MAX_ARTICLES = 8

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

/** Title row + the most recently published News Articles, newest first. */
const News = async ({ slice }: NewsProps) => {
  const { primary } = slice
  const { results: articles } = await createClient().getByType('news_article', {
    pageSize: MAX_ARTICLES,
    orderings: { field: 'document.first_publication_date', direction: 'desc' },
  })

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container pt-18 pb-24 md:pt-22"
    >
      {/* Draws left→right on first scroll-in (later). */}
      <div className="divider origin-top scale-y-50" />
      <div className="grid-default font-display mt-4">
        {primary.eyebrow && (
          <p className="text-shoulder-sm md:text-shoulder col-span-4 md:col-span-6">
            {primary.eyebrow}
          </p>
        )}
        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-h2-sm md:text-h2 col-span-4 mt-6 md:col-span-6 md:col-start-7 md:mt-0">
                {children}
              </h2>
            ),
          }}
        />
      </div>

      {articles.length > 0 && (
        // Mobile: the 3 latest as a list. Desktop: a sliding strip of all.
        <ul className="md:-mx-global md:px-global mt-16 flex scrollbar-none flex-col gap-6 md:mt-72 md:flex-row md:gap-8 md:overflow-x-auto">
          {articles.map((article, index) => (
            <li
              key={article.id}
              className={cn('md:shrink-0', index >= 3 && 'hidden md:block')}
            >
              <NewsCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function NewsCard({ article }: { article: Content.NewsArticleDocument }) {
  const { data } = article
  const date = asDate(data.date)

  return (
    <PrismicNextLink
      field={data.link}
      className="md:hover:bg-card flex items-stretch gap-6 rounded-2xl transition-colors md:items-center md:p-4"
    >
      <div className="bg-muted relative h-25 w-33.5 shrink-0 overflow-hidden rounded-xl">
        <PrismicNextImage
          field={data.image}
          fill
          fallbackAlt=""
          sizes="8.5rem"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-between gap-6 md:justify-start md:pb-2">
        <PrismicRichText
          field={data.title}
          components={{
            heading3: ({ children }) => (
              <h3 className="text-body md:font-display md:text-h5 md:w-75">
                {children}
              </h3>
            ),
          }}
        />
        <p className="text-body-sm text-muted flex items-center gap-2">
          {data.category}
          {data.category && date && (
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-current"
            />
          )}
          {date && (
            <time dateTime={data.date ?? undefined}>
              {dateFormat.format(date)}
            </time>
          )}
        </p>
      </div>
    </PrismicNextLink>
  )
}

export default News
