import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from './components/FormSection';
import ResumePreview from './components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { db } from '../../../../../config/index';
import { Resume } from '../../../../../config/schema';
import { and, eq } from 'drizzle-orm';
import { useUser } from '@clerk/clerk-react';

const EditResume = () => {
  const params = useParams();
  const { user } = useUser();
  const resumeId = params.resumeId;
  const [resumeInfo, setResumeInfo] = useState();

  const getResumeInfo = async () => {
    const response = await db.select().from(Resume).where(
      and(eq(Resume.createdBy, user?.primaryEmailAddress?.emailAddress), eq(Resume.resumeId, resumeId)))
    setResumeInfo(response[0])
  }
  useEffect(() => {
    user && getResumeInfo();
  }, [params])

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 gap-10 p-10 md:grid-cols-2'>
        {/* Form Section */}
        <FormSection resumeId={resumeId} />

        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume