import { Children, Fragment, isValidElement, type ReactNode } from 'react'

/**
 * Line breaks typed in Prismic (Shift+Enter) are often set for the desktop
 * layout. This keeps them from md up and turns them into spaces on mobile,
 * so text wraps naturally there.
 */
export function desktopBreaks(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return child
    if (child.type === 'br')
      return (
        <>
          <span className="md:hidden"> </span>
          <br className="max-md:hidden" />
        </>
      )
    // Prismic wraps text runs in fragments; look inside them.
    if (child.type === Fragment)
      return <>{desktopBreaks(child.props.children)}</>
    return child
  })
}
