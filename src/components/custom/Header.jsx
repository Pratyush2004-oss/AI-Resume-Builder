import React from 'react'
import { Button } from '../ui/button'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom';

const Header = () => {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-3 px-5 flex items-center justify-between shadow-md rounded-md'>
            <Link to={'/'} className='flex-col flex'>
                <h1 className='text-2xl font-bold text-purple-600'>Resume</h1>
                <h1 className='text-xl font-bold'>Builder</h1>
            </Link>

            {
                isSignedIn ?
                    <div className='flex items-center gap-5'>
                        <Link to={'/dashboard'}>
                            <Button variant='outline'>Dashboard</Button>
                        </Link>
                        <UserButton />
                    </div>
                    :
                    <Link to={'/auth/sign-in'}>
                        <Button variant=''>Get Started</Button>
                    </Link>
            }

        </div>
    )
}

export default Header