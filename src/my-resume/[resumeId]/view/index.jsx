import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/[resumeId]/edit/components/ResumePreview'
import { db } from '../../../../config/index';
import React, { useEffect, useState } from 'react'
import { Resume } from '../../../../config/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'react-router-dom';
import { RWebShare } from 'react-web-share';

const ViewResume = () => {
    const params = useParams();
    const resumeId = params.resumeId;
    const [resumeInfo, setResumeInfo] = useState();
    const getResumeData = async () => {
        const response = await db.select().from(Resume)
            .where(eq(Resume.resumeId, resumeId))
        setResumeInfo(response[0])
    }

    const HandleDownload = () => {
        window.print();
    }

    useEffect(() => {
        getResumeData();
    }, [resumeId])
    return resumeInfo && (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id='no-print'>
                <Header />
                <div className='my-10 md:mx-20 lg:mx-36'>
                    <div className='max-sm:mx-10'>
                        <h2 className='font-serif text-2xl font-bold text-center'>Congrats, Your ultimate AI generated Resume is Ready</h2>
                        <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique resume url with your friends.</p>
                        <div className='flex items-center justify-between mx-10 my-10 md:mx-44'>
                            <Button onClick={HandleDownload}>Download</Button>
                            <RWebShare
                                data={{
                                    text: "Hello Everyone, This is my Resume. Please click the URL to see.",
                                    url: `${import.meta.env.VITE_PUBLIC_BASE_URL}/my-resume/${resumeId}/view`,
                                    title: `${resumeInfo.firstName} ${resumeInfo.lastName} resume`,
                                }}
                                onClick={() => console.log("shared successfully!")}>
                                <Button>Share</Button>
                            </RWebShare>
                        </div>
                    </div>
                </div>
            </div>
            <div id='print-area'>
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume