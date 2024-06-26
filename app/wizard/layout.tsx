import React, { ReactNode } from 'react'

function layout({ children } : {children: ReactNode}) {

  return (
    <div className='flex h-screen w-full justify-center items-center'>
        {children}
    </div>
  )
}

export default layout