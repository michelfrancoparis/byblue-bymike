import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { TeamList, type TeamMember } from './team-list'

export type TeamProps = SliceComponentProps<Content.TeamSlice>

/**
 * Divider + eyebrow, title and short text on the left; accordion of team
 * members on the right. Members (and their order) are picked from the
 * Team Member collection.
 */
const Team = ({ slice }: TeamProps) => {
  const { primary } = slice
  const members: TeamMember[] = primary.members.flatMap(({ member }) =>
    isFilled.contentRelationship(member) && member.data?.name
      ? [
          {
            id: member.id,
            name: member.data.name,
            role: member.data.role ?? null,
            photo: member.data.photo,
            bio: member.data.bio,
          },
        ]
      : [],
  )

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container py-18"
    >
      <div className="divider origin-top scale-y-50" />
      {primary.eyebrow && (
        <p className="font-display text-shoulder-sm md:text-shoulder mt-4">
          {primary.eyebrow}
        </p>
      )}

      <div className="grid-default mt-6 gap-y-16 md:mt-17 md:gap-y-12">
        <div className="col-span-4 flex flex-col gap-4 md:col-span-5 md:gap-9">
          <PrismicRichText
            field={primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-display text-h2-sm md:text-h2">
                  {children}
                </h2>
              ),
            }}
          />
          <div className="text-body md:text-h6 text-muted max-w-56">
            <PrismicRichText field={primary.description} />
          </div>
        </div>

        <TeamList
          members={members}
          className="col-span-4 md:col-span-7 md:col-start-6"
        />
      </div>
    </section>
  )
}

export default Team
