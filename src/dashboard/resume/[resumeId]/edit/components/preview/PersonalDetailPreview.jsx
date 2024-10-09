import React from 'react'

const PersonalDetailPreview = ({ resumeInfo }) => {
    return resumeInfo && (
        <div>
            <h2>{resumeInfo.firstName} {resumeInfo.lastName}</h2>
        </div>
    )
}

export default PersonalDetailPreview