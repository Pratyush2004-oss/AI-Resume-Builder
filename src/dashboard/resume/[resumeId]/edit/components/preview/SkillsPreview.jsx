import React from 'react'

const SkillsPreview = ({ resumeInfo }) => {
    return resumeInfo && (
        <div>
            <h2 style={{
                color: resumeInfo.themeColor
            }}
                className='mb-2 text-sm font-bold text-center '>Skills</h2>
            <hr style={{
                borderColor: resumeInfo.themeColor
            }} />

            <div className='grid grid-cols-2 gap-3 my-4'>
                {resumeInfo.skills.map((skill, idx) => (
                    <div className='flex items-center justify-between px-3' key={idx}>
                        <h2 className='text-xs'>{skill.name}</h2>
                        <div className='h-2 bg-gray-200 rounded-full w-[120px]'>
                            <div className='h-2 rounded-full'
                                style={{
                                    backgroundColor: resumeInfo.themeColor,
                                    width: skill.rating + '%'
                                }}></div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default SkillsPreview