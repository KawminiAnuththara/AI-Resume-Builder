import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import robot from '../../assets/robo.jpg'

function SignInPage() {
  return (
    <div className='relative h-screen'>
      <img src={robot} className='absolute inset-0 object-cover w-full h-full blur-sm' alt='Background' />
      <div className='relative z-10 flex justify-center items-center h-full'>
        <div className='bg-white bg-opacity-80 p-8 rounded-lg shadow-lg'>
          <SignIn />
        </div>
      </div>
    </div>
  )
}

export default SignInPage
