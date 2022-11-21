import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-sky-500 font-semibold text-white hover:bg-sky-600 active:bg-sky-800',
  secondary:
    'bg-sky-50 font-medium text-white hover:bg-sky-100 active:bg-sky-100 active:text-sky-900/60',
}

export function Button({ variant = 'primary', className, href, ...props }) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none shadow-md',
    variantStyles[variant],
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
