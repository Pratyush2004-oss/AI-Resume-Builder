import React from 'react'

const EducationalPreview = ({ resumeInfo }) => {
    return resumeInfo && (
        <div className='my-6'>
            <h2 style={{
                color: resumeInfo.themeColor
            }}
                className='mb-2 text-sm font-bold text-center'>Education </h2>
            <hr style={{
                borderColor: resumeInfo.themeColor
            }} />

            {resumeInfo.education.map((edu, idx) => (
                <div key={idx} className='my-5'>
                    <h2 style={{
                        color: resumeInfo.themeColor
                    }}
                    className='text-sm font-bold'>{edu.universityName}</h2>
                    <h2 className='flex justify-between text-xs'>{edu.degree} in {edu.major}
                        <span className='font-semibold'>{edu.startDate} <span className='font-light'>To</span> {edu.endDate}</span>
                    </h2>
                    <p className='my-2 text-xs text-justify'>{edu.description}</p>
                </div>
            ))}
        </div>
    )
}

export default EducationalPreview