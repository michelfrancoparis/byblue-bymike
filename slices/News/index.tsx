import type { Content } from '@prismicio/client'
import { asDate } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
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
      className="container pt-22 pb-24"
    >
      {/* Draws left→right on first scroll-in (later). */}
      <div className="divider origin-top scale-y-50" />
      <div className="grid-default font-display mt-4">
        {primary.eyebrow && (
          <p className="text-shoulder col-span-4 md:col-span-6">
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
        <ul className="-mx-global px-global mt-24 flex scrollbar-none gap-8 overflow-x-auto md:mt-72">
          {articles.map((article) => (
            <li key={article.id} className="shrink-0">
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
      className="hover:bg-card flex items-center gap-6 rounded-2xl p-4 transition-colors"
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
      <div className="flex flex-col gap-6 pb-2">
        <PrismicRichText
          field={data.title}
          components={{
            heading3: ({ children }) => (
              <h3 className="font-display text-h5 w-75">{children}</h3>
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
