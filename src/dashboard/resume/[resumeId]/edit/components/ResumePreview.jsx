import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ProfessionalPreview from './preview/ProfessionalPreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';

const ResumePreview = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    return resumeInfo && (
        <div className='shadow-lg h-full p-14 border-t-[20px]'
            style={{
                borderColor: resumeInfo.themeColor
            }}
        >
            {/* Personal Details  */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />

            {/* Summary */}
            <SummaryPreview resumeInfo={resumeInfo} />

            {/* Professional Experience */}
            <ProfessionalPreview resumeInfo={resumeInfo}/>
            
            {/* Educational */}
            <EducationalPreview resumeInfo={resumeInfo}/>
            
            {/* Skills */}
            <SkillsPreview resumeInfo={resumeInfo}/>


        </div>
    )
}

export default ResumePreview