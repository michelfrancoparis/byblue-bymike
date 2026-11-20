import { asText, type Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { ArrowIcon } from '@/components/icons/arrow'
import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { desktopBreaks } from '@/lib/desktop-breaks'
import { cn } from '@/lib/utils'

export type ContactHeroProps = SliceComponentProps<Content.ContactHeroSlice>

// Mobile: white fields on the off-white card. md+: glass fields on the photo.
const inputClass =
  'text-body bg-card text-foreground placeholder:text-muted md:text-card md:placeholder:text-card/70 w-full rounded-lg px-4 py-3.5 focus:outline-none md:bg-white/20 md:py-3 md:focus:bg-white/25'

/**
 * Full-screen photo with the intro bottom-left and a glass contact form on
 * the right. Mobile: full-bleed photo with the intro, then the form on an
 * off-white card below (Figma). Every form field is defined in Prismic. Display only: the form
 * does not send anything.
 */
const ContactHero = ({ slice }: ContactHeroProps) => {
  const { primary } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-primary flex pb-2 md:min-h-svh md:p-2"
    >
      <div className="md:bg-foreground text-card flex flex-1 flex-col justify-end gap-2 md:relative md:gap-8 md:overflow-hidden md:rounded-4xl md:p-3 md:pt-32 xl:flex-row xl:items-end xl:justify-between">
        {/* Mobile: this block is the photo; md+: it melts into the frame
            (static), so the photo spans the whole frame behind the form. */}
        <div className="bg-foreground relative flex min-h-166 flex-col justify-end overflow-hidden md:static md:min-h-0 md:overflow-visible md:bg-transparent">
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

          <div className="relative flex max-w-150 flex-col gap-6 px-2 pt-32 pb-10.5 md:gap-10 md:p-5">
            {primary.eyebrow && (
              <p className="font-display text-shoulder-sm md:text-shoulder">
                {primary.eyebrow}
              </p>
            )}
            <PrismicRichText
              field={primary.title}
              components={{
                heading1: ({ children }) => (
                  <h1 className="font-display text-display-sm md:text-h1 max-w-140">
                    {desktopBreaks(children)}
                  </h1>
                ),
              }}
            />
            <div className="text-body md:text-h6 max-w-132">
              <PrismicRichText
                field={primary.description}
                components={{
                  paragraph: ({ children }) => <p>{desktopBreaks(children)}</p>,
                }}
              />
            </div>
          </div>
        </div>

        <form
          aria-label={asText(primary.title) || 'Contact form'}
          className="bg-background text-foreground md:photo-card-glass md:text-card relative mx-2 flex flex-col gap-4 rounded-3xl px-3 py-8 md:mx-0 md:w-full md:gap-6 md:bg-transparent md:p-8 xl:max-w-170 xl:shrink-0"
        >
          <div className="grid grid-cols-2 gap-x-2 gap-y-4.5 md:gap-y-5">
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
                    <p id={helpId} className="text-caption md:text-card/80">
                      {field.help_text}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex flex-col items-start gap-4.5 md:gap-6">
            {primary.privacy_note && (
              <p className="text-body-sm md:text-card/80">
                {primary.privacy_note}
              </p>
            )}
            {primary.submit_label && (
              <button
                type="button"
                className="group text-body text-card flex cursor-pointer items-center"
              >
                {/* Mobile: arrow + pill like the other CTAs (Figma). */}
                <span className="bg-foreground/55 flex size-12 items-center justify-center rounded-full md:hidden">
                  <ArrowIcon className="size-5" />
                </span>
                <span className="bg-foreground/55 rounded-full px-6 py-4.5 leading-none transition-colors md:bg-white/10 md:group-hover:bg-white/20">
                  {primary.submit_label}
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactHero
