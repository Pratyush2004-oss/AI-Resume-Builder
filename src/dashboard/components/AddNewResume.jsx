import { Loader, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/clerk-react';
import { db } from '../../../config/index';
import { Resume } from '../../../config/schema';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddNewResume = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState("");
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onCreate = async () => {
        try {
            setLoading(true);
            const uuid = uuidv4();
            const response = await db.insert(Resume)
                .values({
                    resumeId: uuid,
                    title: resumeTitle,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD/MM/yyyy'),
                    userName: user?.fullName,
                })
            if (response) {
                toast("Title Created Successfully")
                navigate(`/dashboard/resume/${uuid}/edit`)
            }
        } catch (error) {
            toast.error("Error Posting Title");
        }
        finally {
            setLoading(false)
            setOpenDialog(false)
        }

    }
    return (
        <div>
            <div className='p-14 py-24 flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed border-4' onClick={() => setOpenDialog(true)}>
                <PlusSquare />
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <span>Add Title for your new Resume</span>
                            <Input className='my-2'
                                onChange={(e) => setResumeTitle(e.target.value)}
                                placeholder='Ex. Full-Stack Resume' />
                        </DialogDescription>
                        <div className='flex items-center justify-end gap-4'>
                            <Button variant='destructive' onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button onClick={onCreate} disabled={!resumeTitle}>{loading ? <Loader className='animate-spin' /> : 'Create'}</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewResume