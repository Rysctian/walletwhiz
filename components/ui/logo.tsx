import { HandCoins } from 'lucide-react'
import React from 'react'

function Logo() {
    return (

        <a href="/" className='flex items-center justify-center gap-2'>
            <div className='text-3xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent'   >
                WalletWhiz
            </div>
            <HandCoins 
            color='purple' 
            height={50} 
            width={50} 
            />
        </a>


    )
}

export function MobileLogo() {
    return (
        <a href="/" className='flex items-center gap-3'>
            <div className='text-[1.5rem] font-extrabold tracking-tighter  bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent'   >
                WalletWhiz
            </div>
            <HandCoins
                color='purple'
                height={40}
                width={40}
            />
        </a>
    )
}


export default Logo



