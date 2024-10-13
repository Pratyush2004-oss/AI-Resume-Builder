import React, { useEffect, useState } from 'react'
import AddNewResume from './components/AddNewResume'
import { useUser } from '@clerk/clerk-react'
import { db } from '../../config/index';
import { Resume } from '../../config/schema';
import { desc, eq } from 'drizzle-orm';
import ResumeCard from './components/ResumeCard';
import { User } from 'lucide-react';

const Dashboard = () => {
    const { user } = useUser();
    const [UserResemes, setUserResemes] = useState([]);
    const GetResumes = async () => {
        const response = await db.select().from(Resume)
            .where(eq(Resume.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(Resume.createdAt))
        if (response) {
            setUserResemes(response)
        }
    }

    useEffect(() => {
        user && GetResumes();
    }, [user])
    return (
        <div className='p-10 md:px-20 lg:mx-32'>
            <h2 className='text-2xl font-bold'>My Resume</h2>
            <p>Start Creating AI resime to your next Job Role </p>
            <div className='grid grid-cols-2 gap-5 mt-10 md:grid-cols-3'>
                <AddNewResume />
                {UserResemes.length > 0 && UserResemes.map((resume, idx) => (
                    <ResumeCard key={idx} resume={resume} refreshData={GetResumes} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard