import { Download, Edit, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ResumeCard = ({ resume }) => {
    return (
        <div className='p-8 flex flex-col justify-between bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 rounded-lg h-[280px] hover:scale-105 border-t-4 border-t-red-400 transition-all hover:shadow-md'>
            <h1 className='font-serif text-sm font-bold text-center'>{resume.title}</h1>
            <img src='/public/cv.png' className='mx-auto size-28'/>
            <div className='flex justify-end gap-4'>
                <Link to={`/dashboard/resume/${resume.resumeId}/edit`}><Edit className='p-0.5 text-white bg-purple-500 rounded-md' /></Link>
                <Download className='text-white bg-black rounded-md cursor-pointer p-0.5' />
                <Trash2 className='text-red-500 cursor-pointer' />
            </div>
        </div>
    )
}

export default ResumeCard