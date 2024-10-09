import React from 'react'

const PersonalDetailPreview = ({ resumeInfo }) => {
    return resumeInfo && (
        <div>
            <div
                style={{
                    color: resumeInfo.themeColor
                }}>
                <h2 className='font-bold text-xl text-center'

                >{resumeInfo.firstName} {resumeInfo.lastName}</h2>
                <h2 className='text-center text-sm font-medium'>{resumeInfo.jobTitle}</h2>
                <h2 className='text-center font-normal text-xs'>{resumeInfo.address}</h2>
            </div>
            <div className='flex justify-between' style={{
                color: resumeInfo.themeColor
            }}>
                <h2 className='font-normal text-xs'>{resumeInfo.phone}</h2>
                <h2>{resumeInfo.email}</h2>
            </div>
            <hr className='border-[1.5px] my-2'
                style={{
                    borderColor: resumeInfo.themeColor
                }}
            />
        </div>
    )
}

export default PersonalDetailPreview