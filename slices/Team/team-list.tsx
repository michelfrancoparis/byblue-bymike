'use client'

import type { ImageField, RichTextField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export type TeamMember = {
  id: string
  name: string
  role: string | null
  photo: ImageField
  bio: RichTextField
}

/**
 * Accordion: one member open (big photo + bio), the rest as compact rows.
 * Clicking a row opens it and closes the previous one.
 */
export function TeamList({
  members,
  className,
}: {
  members: TeamMember[]
  className?: string
}) {
  const [openId, setOpenId] = useState(members[0]?.id)

  return (
    <ul className={cn('flex flex-col gap-2', className)}>
      {members.map((member) => {
        const open = member.id === openId
        const bioId = `team-bio-${member.id}`
        return (
          <li key={member.id} className="relative flex items-start gap-2">
            <div
              className={cn(
                'bg-card relative size-26.5 shrink-0 overflow-hidden transition-all duration-500 ease-out',
                open ? 'rounded-3xl lg:size-85' : 'rounded-2xl',
              )}
            >
              <PrismicNextImage
                field={member.photo}
                fill
                fallbackAlt=""
                sizes="(min-width: 64em) 21.25rem, 6.625rem"
                className="object-cover"
              />
            </div>

            <div
              className={cn(
                'bg-card flex min-h-26.5 min-w-0 flex-1 flex-col p-6 transition-all duration-500 ease-out',
                open ? 'rounded-3xl lg:min-h-85' : 'rounded-2xl',
              )}
            >
              <h3 className="font-display text-h5 md:text-h4">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={bioId}
                  onClick={() => setOpenId(member.id)}
                  className="text-left after:absolute after:inset-0 after:content-['']"
                >
                  {member.name}
                </button>
              </h3>
              {member.role && (
                <p className="text-caption mt-2 uppercase">{member.role}</p>
              )}

              <div
                id={bioId}
                inert={!open}
                className={cn(
                  'grid transition-all duration-500 ease-out',
                  open
                    ? 'rows-expanded opacity-100'
                    : 'rows-collapsed opacity-0',
                )}
              >
                <div className="text-body text-muted min-h-0 overflow-hidden">
                  <div className="pt-12 md:pt-17">
                    <PrismicRichText field={member.bio} />
                  </div>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
