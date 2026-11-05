import { clsx } from 'clsx'

export function Container({
  className,
  children,
  paddingClassNames
}: {
  className?: string
  children: React.ReactNode
  paddingClassNames?: string
}) {
  // const pclass = paddingClassNames?.includes("px-")? paddingClassNames: "px-4 md:px-8 lg:px-12 xl:px-12"
  const pclass = "px-4"
  return (
    <div className={clsx('', className)}>
      <div className={clsx( "max-w-7xl mx-auto ", pclass) }>{children}</div>
      {/* <div className={clsx( "mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl ", pclass) }>{children}</div> */}
    </div>
  )
}
