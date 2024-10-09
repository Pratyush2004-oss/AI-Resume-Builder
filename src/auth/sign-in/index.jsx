import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <div className='my-10 flex items-center justify-center'>
      <SignIn />
    </div>
  )
}

export default SignInPage