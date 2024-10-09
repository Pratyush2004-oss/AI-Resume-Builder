import { Download, Edit, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ResumeCard = ({ resume }) => {
    return (
        <div className='p-8 flex flex-col justify-between bg-gradient-to-br from-purple-100 to-purple-100 rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md border-4'>
            <h1 className='text-center font-bold font-serif text-sm'>{resume.title}</h1>
            <div className='flex justify-end gap-4'>
                <Link to={`/dashboard/resume/${resume.resumeId}/edit`}><Edit className='bg-purple-500 rounded-md text-white' /></Link>
                <Download className='bg-black text-white rounded-md cursor-pointer' />
                <Trash2 className='text-red-500 cursor-pointer' />
            </div>
        </div>
    )
}

export default ResumeCard