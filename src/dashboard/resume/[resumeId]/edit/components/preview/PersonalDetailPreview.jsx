import React from 'react'

const PersonalDetailPreview = ({ resumeInfo }) => {
    return resumeInfo && (
        <div>
            <div>
                <h2 className='text-xl font-bold text-center'
                    style={{
                        color: resumeInfo.themeColor
                    }}
                >{resumeInfo.firstName} {resumeInfo.lastName}</h2>
                <h2 className='text-sm font-medium text-center'>{resumeInfo.jobTitle}</h2>
                <h2
                    style={{
                        color: resumeInfo.themeColor
                    }}
                    className='text-xs font-normal text-center'>{resumeInfo.address}</h2>
            </div>
            <div className='flex justify-between' style={{
                color: resumeInfo.themeColor
            }}>
                <h2 className='text-xs font-normal'>{resumeInfo.phone}</h2>
                <h2 className='text-xs font-normal'>{resumeInfo.email}</h2>
            </div>
            <hr className='border-[1.5px] my-2'
                style={{
                    borderColor: resumeInfo.themeColor
                }}
            />s
        </div>
    )
}

export default PersonalDetailPreview