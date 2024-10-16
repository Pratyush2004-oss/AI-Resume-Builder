import React from 'react'

const SkillsPreview = ({ resumeInfo }) => {
    return resumeInfo && resumeInfo.skills && (
        <div>
            <h2 style={{
                color: resumeInfo.themeColor
            }}
                className='mb-2 text-sm font-bold text-center '>Skills</h2>
            <hr style={{
                borderColor: resumeInfo.themeColor
            }} />

            <div className='grid grid-cols-2 my-4 gap-7'>
                {resumeInfo.skills && typeof (resumeInfo.skills) === 'object' ?
                    (
                        resumeInfo.skills.map((skill, idx) => (
                            <div className='flex items-center justify-between gap-5' key={idx}>
                                <h2 className='text-xs'>{skill.name}</h2>
                                <div className='h-1.5 bg-gray-200 rounded-full w-1/2'>
                                    <div className='h-1.5 rounded-full'
                                        style={{
                                            backgroundColor: resumeInfo.themeColor,
                                            width: skill.rating * 20 + '%'
                                        }}></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        JSON.parse(resumeInfo.skills).map((skill, idx) => (
                            <div className='flex items-center justify-between gap-5 px-5' key={idx}>
                                <h2 className='text-xs'>{skill.name}</h2>
                                <div id='print-area' className='h-1.5 bg-gray-200 rounded-full w-1/2 max-w-[150px]'>
                                    <h4 className='h-1.5 rounded-full'
                                        style={{
                                            backgroundColor: resumeInfo.themeColor,
                                            width: skill.rating * 20 + '%'
                                        }}></h4>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default SkillsPreview