import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { db } from '../../../../../../../config/index'
import { Resume } from '../../../../../../../config/schema'
import React, { useContext, useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import { and, eq } from 'drizzle-orm'
import { Loader2 } from 'lucide-react'

const formFields = {
  universityName: '',
  startDate: '',
  endDate: '',
  degree: '',
  major: '',
  description: ''
}

const Education = ({ resumeId, enabledNext }) => {
  const { user } = useUser();
  const [educationList, setEducationList] = useState([
    formFields
  ]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const handleChange = (e, idx) => {
    const newEntries = educationList.slice();
    const { name, value } = e.target;
    newEntries[idx][name] = value;
    setEducationList(newEntries);
  }

  const addnewEducation = () => {
    setEducationList([...educationList, formFields])
  }

  const RemoveEducation = () => {
    setEducationList(educationList => educationList.slice(0, -1))
  }

  const Save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await db.update(Resume).set({
        education: JSON.stringify(resumeInfo.education)
      }).where(and(eq(Resume.createdBy, user.primaryEmailAddress.emailAddress), eq(Resume.resumeId, resumeId)))
      if (response) {
        toast("Educational Info Upated Successfully");
        setLoading(false)
        enabledNext(true);
      }
    } catch (error) {
      console.log(error)
      toast.error("Error Updating Educational Info..")
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    enabledNext(false);
    resumeInfo && setResumeInfo({
      ...resumeInfo,
      education: educationList
    })
  }, [educationList])

  useEffect(() => {
    JSON.parse(resumeInfo?.education).length > 0 && setEducationList(JSON.parse(resumeInfo?.education))
  }, [])

  return resumeInfo && (
    <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
      <h2 className='text-xl font-bold'>Education</h2>
      <p>Add your Educational Details</p>
      <div>
        {educationList.map((item, idx) => (
          <div key={idx}>
            <div className='grid grid-cols-2 gap-5 p-3 my-5 border rounded-lg shadow-lg'>
              <div className='col-span-2 gap-1 my-2'>
                <label className='text-sm font-semibold'>University Name</label>
                <Input defaultValue={item.universityName} name='universityName' onChange={(e) => handleChange(e, idx)} />
              </div>
              <div className='gap-1 my-2'>
                <label className='text-sm font-semibold'>Degree</label>
                <Input defaultValue={item.degree} name='degree' onChange={(e) => handleChange(e, idx)} />
              </div>
              <div className='gap-1 my-2'>
                <label className='text-sm font-semibold'>Major</label>
                <Input defaultValue={item.major} name='major' onChange={(e) => handleChange(e, idx)} />
              </div>
              <div className='gap-1 my-2'>
                <label className='text-sm font-semibold'>Start Date</label>
                <Input defaultValue={item.startDate} name='startDate' type='date' onChange={(e) => handleChange(e, idx)} />
              </div>
              <div className='gap-1 my-2'>
                <label className='text-sm font-semibold'>End Date</label>
                <Input defaultValue={item.endDate} name='endDate' type='date' onChange={(e) => handleChange(e, idx)} />
              </div>
              <div className='col-span-2 gap-1 my-2'>
                <label className='text-sm font-semibold'>Description</label>
                <Textarea defaultValue={item.description} name='description' onChange={(e) => handleChange(e, idx)} />
              </div>
            </div>
          </div>
        ))}
        <div className='flex justify-between'>
          <div className='flex gap-3'>
            <Button variant='outline' className='text-primary' onClick={addnewEducation}> + Add more</Button>
            {
              educationList.length > 1 &&
              <Button variant='destructive' onClick={RemoveEducation}> - Remove</Button>
            }
          </div>
          <Button onClick={Save}> {loading ? <Loader2 className='animate-spin text-primary' /> : 'Save'}</Button>
        </div>
      </div>
    </div>

  )
}

export default Education