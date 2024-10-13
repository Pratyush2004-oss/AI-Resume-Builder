import { Resume } from '../../../config/schema'
import { db } from '../../../config/index'
import { Download, Edit, Loader, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { eq } from 'drizzle-orm'
import { toast } from 'react-toastify'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
const ResumeCard = ({ resume, refreshData }) => {
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)
    const HandleDelete = async () => {
        try {
            setLoading(true);
            const response = await db.delete(Resume).where(eq(Resume.resumeId, resume.resumeId));
            if (response) {
                toast.success("Resume Deleted Successfully")
            }
        } catch (error) {
            toast.error("Error deleting Resume")
        }
        finally {
            setLoading(false);
            setOpenDialog(false);
            refreshData();
        }
    }
    return resume && (
        <div
            style={{
                borderColor: resume.themeColor
            }}
            className='p-8 flex flex-col justify-between bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 rounded-lg h-[280px] hover:scale-105 border-t-[7px] transition-all hover:shadow-md'>
            <h1 className='font-serif text-sm font-bold text-center'
                style={{
                    color: resume.themeColor
                }}
            >{resume.title}</h1>
            <img src='/public/cv.png' className='mx-auto rounded-lg size-28' />
            <div className='flex justify-end gap-4'>
                <Link to={`/dashboard/resume/${resume.resumeId}/edit`}><Edit className='p-0.5 text-white bg-purple-500 rounded-md' /></Link>
                <Link to={`/my-resume/${resume.resumeId}/view`}><Download className='text-white bg-black rounded-md cursor-pointer p-0.5' /></Link>
                <Trash2 onClick={() => setOpenDialog(true)} className='text-red-500 cursor-pointer' />
                <Dialog open={openDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are You Sure? </DialogTitle>
                            <DialogDescription>
                                <span>This action is irreversible. Click continue to delete the Resume permanently </span>
                                <div className='flex items-center justify-end gap-4 mt-7'>
                                    <Button variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button variant='destructive' onClick={() => HandleDelete()}>{loading ? <Loader className='animate-spin' /> : 'Continue'}</Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div >
    )
}

export default ResumeCard