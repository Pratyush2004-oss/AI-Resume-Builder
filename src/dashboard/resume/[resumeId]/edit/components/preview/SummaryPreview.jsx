import React from 'react'

const SummaryPreview = ({ resumeInfo }) => {
  return resumeInfo && (
    <p className='text-xs text-justify'>
      {resumeInfo.summery}
    </p>
  )
}

export default SummaryPreview