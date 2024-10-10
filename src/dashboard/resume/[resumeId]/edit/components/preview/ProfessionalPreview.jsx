import React from 'react'

const ProfessionalPreview = ({ resumeInfo }) => {
    return resumeInfo && (
        <div className='my-6'>
            <h2 style={{
                color: resumeInfo.themeColor
            }}
                className='mb-2 text-sm font-bold text-center'>Professional Experience</h2>
            <hr style={{
                borderColor: resumeInfo.themeColor
            }} />

            {resumeInfo.experience.map((exp, idx) => (
                <div key={idx} className='my-5'>
                    <h2 style={{
                        color: resumeInfo.themeColor
                    }}
                        className='text-sm font-bold'>{exp.title}</h2>
                    <h2 className='flex justify-between text-xs'>{exp.companyName}, {exp.city} , {exp.state}
                        <span>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                    </h2>
                    <p className='my-2 text-xs text-justify'>
                        {exp.workSummery}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default ProfessionalPreview