import React from 'react'
import Image from 'next/image';
import { assets } from '@/assets/assets';

const Footer = () => {
  return (
    <div className='mt-20'>
        <div className='text-center'>
            <Image src={assets.logo} alt="logo" className="w-36 mx-auto mb-2" />
        </div>
    </div>
  )
}

export default Footer