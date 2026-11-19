import { asText, type Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { cn } from '@/lib/utils'

export type ContactHeroProps = SliceComponentProps<Content.ContactHeroSlice>

const inputClass =
  'text-body w-full rounded-lg bg-white/20 px-4 py-3 text-card placeholder:text-card/70 focus:bg-white/25 focus:outline-none'

/**
 * Full-screen photo with the intro bottom-left and a glass contact form on
 * the right. Every form field is defined in Prismic. Display only: the form
 * does not send anything.
 */
const ContactHero = ({ slice }: ContactHeroProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-primary flex min-h-svh p-2"
    >
      <div className="bg-foreground text-card relative flex flex-1 flex-col justify-end gap-8 overflow-hidden rounded-4xl p-3 pt-32 xl:flex-row xl:items-end xl:justify-between">
        <PrismicNextImage
          field={primary.image}
          fill
          fallbackAlt=""
          sizes="100vw"
          fetchPriority="high"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="contact-hero-overlay absolute inset-0"
        />

        <div className="relative flex max-w-150 flex-col gap-10 p-5">
          {primary.eyebrow && (
            <p className="font-display text-shoulder">{primary.eyebrow}</p>
          )}
          <PrismicRichText
            field={primary.title}
            components={{
              heading1: ({ children }) => (
                <h1 className="font-display text-h1-sm md:text-h1 max-w-140">
                  {children}
                </h1>
              ),
            }}
          />
          <div className="text-h6 max-w-132">
            <PrismicRichText field={primary.description} />
          </div>
        </div>

        <form
          aria-label={asText(primary.title) || 'Contact form'}
          className="photo-card-glass relative flex w-full flex-col gap-6 rounded-3xl p-6 md:p-8 xl:max-w-170 xl:shrink-0"
        >
          <div className="grid grid-cols-2 gap-x-2 gap-y-5">
            {primary.fields.map((field, index) => {
              const id = `contact-field-${index}`
              const helpId = field.help_text ? `${id}-help` : undefined
              const options = (field.options ?? '')
                .split(',')
                .map((option) => option.trim())
                .filter(Boolean)
              return (
                <div
                  key={index}
                  className={cn(
                    'col-span-2 flex flex-col gap-3',
                    field.width !== 'Full' && 'sm:col-span-1',
                  )}
                >
                  <label htmlFor={id} className="text-body">
                    {field.label}
                  </label>
                  {field.type === 'Message' ? (
                    <textarea
                      id={id}
                      rows={4}
                      placeholder={field.placeholder ?? undefined}
                      aria-describedby={helpId}
                      className={cn(inputClass, 'resize-none')}
                    />
                  ) : field.type === 'Dropdown' ? (
                    <div className="relative">
                      <select
                        id={id}
                        defaultValue={field.placeholder ? '' : undefined}
                        aria-describedby={helpId}
                        className={cn(inputClass, 'appearance-none pr-10')}
                      >
                        {field.placeholder && (
                          <option value="" disabled>
                            {field.placeholder}
                          </option>
                        )}
                        {options.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 h-5 w-3 -translate-y-1/2" />
                    </div>
                  ) : (
                    <input
                      id={id}
                      type={field.type === 'Email' ? 'email' : 'text'}
                      placeholder={field.placeholder ?? undefined}
                      aria-describedby={helpId}
                      className={inputClass}
                    />
                  )}
                  {field.help_text && (
                    <p id={helpId} className="text-caption text-card/80">
                      {field.help_text}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex flex-col items-start gap-6">
            {primary.privacy_note && (
              <p className="text-body-sm text-card/80">
                {primary.privacy_note}
              </p>
            )}
            {primary.submit_label && (
              <button
                type="button"
                className="text-body rounded-full bg-white/10 px-6 py-4.5 leading-none transition-colors hover:bg-white/20"
              >
                {primary.submit_label}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactHero
