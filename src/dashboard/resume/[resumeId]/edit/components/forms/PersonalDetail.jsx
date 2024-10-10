import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { db } from '../../../../../../../config/index';
import { Resume } from '../../../../../../../config/schema';
import React, { useContext, useState } from 'react'
import { and, eq } from 'drizzle-orm';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

const PersonalDetail = ({ enabledNext, resumeId }) => {
    const { user } = useUser();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        enabledNext(false)
        const { name, value } = e.target;

        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })

    }

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await db.update(Resume).set({
                firstName: resumeInfo.firstName,
                lastName: resumeInfo.lastName,
                email: resumeInfo.email,
                phone: resumeInfo.phone,
                jobTitle: resumeInfo.jobTitle,
                address: resumeInfo.address
            }).where(and(eq(Resume.createdBy, user.primaryEmailAddress.emailAddress), eq(Resume.resumeId, resumeId)))

            if (response) {
                toast("Data Saved Successfully");
                setLoading(false);
                enabledNext(true);
            }
        } catch (error) {
            toast.error("Error saving the information");
        }
        finally {
            setLoading(false);
        }


    }
    return (
        <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
            <h2 className='text-xl font-bold'>Personal Details</h2>
            <p>Get Started with the basic information</p>
            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 gap-3 my-5'>
                    <div>
                        <label className='text-sm font-semibold'>First Name</label>
                        <Input placeholder='First Name' type='text' required name='firstName' onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm font-semibold'>Last Name</label>
                        <Input placeholder='Last Name' type='text' required name='lastName' onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm font-semibold'>Job Title</label>
                        <Input placeholder='Ex. Full Stack Developer' type='text' required name='jobTitle' onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm font-semibold'>Address</label>
                        <Input placeholder='Address' type='text' required name='address' onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm font-semibold'>Contact Number</label>
                        <Input placeholder='Ex. +91-5494658965' type='text' required name='phone' onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm font-semibold'>Email Address</label>
                        <Input placeholder='Ex. abc@example.com' type='email' required name='email' onChange={handleInputChange} />
                    </div>
                </div>
                <Button className='' type='submit'>{'Save'}</Button>
            </form>
        </div>
    )
}

export default PersonalDetail