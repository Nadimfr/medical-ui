import clsx from 'clsx'
import React from 'react'

const Layout = ({children,cn}) => {
  return (
    <div className={clsx('px-8 lg:px-[70px] mt-[15vh] w-full', cn)}>{children}</div>
  )
}

export default Layout