import type { ComponentProps } from 'react'

export function ChevronDownIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      width={12}
      height={20}
      viewBox="0 0 12 20"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.67578 13.4551L1.17578 8.95508C0.941406 8.74414 0.941406 8.39258 1.17578 8.1582C1.38672 7.94727 1.73828 7.94727 1.97266 8.1582L6.07422 12.2832L10.1758 8.18164C10.3867 7.94727 10.7383 7.94727 10.9727 8.18164C11.1836 8.39258 11.1836 8.74414 10.9727 8.95508L6.44922 13.4551C6.23828 13.6895 5.88672 13.6895 5.67578 13.4551Z"
        fill="currentColor"
      />
    </svg>
  )
}
