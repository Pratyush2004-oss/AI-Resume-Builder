import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from './components/FormSection';
import ResumePreview from './components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';

const EditResume = () => {
  const params = useParams();
  const resumeId = params.resumeId;
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    setResumeInfo(dummy);
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